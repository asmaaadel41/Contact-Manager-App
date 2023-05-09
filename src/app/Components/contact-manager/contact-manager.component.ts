import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/Models/icontact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  loading: boolean = false;
  contacts: IContact[] = [];
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      (response: IContact[]) => {
        this.contacts = response;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      },
    )
  }

  deleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe(
        (response: {}) => {
          this.getAllContacts();
        },
        error => this.errorMessage = error
      )
    }
  }
}
