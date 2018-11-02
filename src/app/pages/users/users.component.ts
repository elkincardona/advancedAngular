import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModaluploadService } from 'src/app/components/modalupload/modalupload.service';

// so that swal doesnt generate sintax error
declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  fromPagging: number = 0;
  sizePagging: number = 3;
  totalUsers: number = 0;
  loading: boolean = false;
  isSearch: boolean = false;
  searchText: string = '';

  constructor(private _userService: UserService, public _modalUploadService: ModaluploadService) { }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification.subscribe( resp => {
        this.loadUsers();
    });
  }

  loadUsers() {
    this.loading = true;
    this._userService.getUsers(this.fromPagging, this.sizePagging).subscribe( resp => {
      this.users = resp.collection;
      this.totalUsers = resp.total;
      this.loading = false;
    });
  }

  search( term: string ) {
    this.isSearch = false;
    if ( term.length <= 0 ) {
      this.users = [];
      this.totalUsers = 0;
      this.loadUsers();
      return;
    }

    this.isSearch = true;
    this.fromPagging = 0;
    this.loading = true;
    this._userService.search(term, this.fromPagging, this.sizePagging).subscribe( resp => {
      this.users = resp.users;
      this.totalUsers = resp.total;
      this.loading = false;
    });
  }

  pagging(next: boolean) {
    if (next) {
      if ( this.fromPagging + this.sizePagging >= this.totalUsers ) {
        return;
      }
      this.fromPagging += this.sizePagging;
      this.loadUsers();
    } else {
      if ( this.fromPagging <= 0 ) {
        this.fromPagging = 0;
        return;
      }
      this.fromPagging -= this.sizePagging;
      // if ( this.isSearch ) {
      //   this.search(this.searchText);
      // } else {
        this.loadUsers();
      // }
    }

  }


  removeUser (user: User) {
    if ( user._id === this._userService.user._id) {
      swal('Error deleting user', 'You cant delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willDelete => {
      if (willDelete) {
        this._userService.removeUser(user._id).subscribe(resp => {
           swal('User removed', 'User removed correctly', 'success');
           this.fromPagging = 0;
           this.loadUsers();
        });
      }
    });
  }



  updateUser (user: User) {
    swal({
      title: 'Are you sure?',
      text: 'you will update the role for this user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willUpdate => {
      if (willUpdate) {
        this._userService.updateRole(user).subscribe(resp => {
           swal('Role updated', 'User role updated correctly', 'success');
           this.fromPagging = 0;
           this.loadUsers();
        });
      }
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal( 'users', id);
  }

}
