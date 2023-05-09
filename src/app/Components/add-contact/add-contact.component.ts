import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/Models/icontact';
import { IGroup } from 'src/app/Models/igroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  loading: boolean = false;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [];
  errorMessage: string | null = null;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this.contactService.getAllGroups().subscribe(
      (response: IGroup[]) => {
        this.groups = response;
      },
      error => this.errorMessage = error
    )
  }

  addContact() {
    this.contactService.addContact(this.contact).subscribe(
      (response: IContact) => {
        this.router.navigate(['/']).then();
      },
      error => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
