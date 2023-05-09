import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/Models/icontact';
import { ContactService } from 'src/app/Services/contact.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { IGroup } from 'src/app/Models/igroup';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  loading: boolean = false;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [];
  errorMessage: string | null = null;
  contactId: string | null = null;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
        this.contactId = param.get('contactId')
      }
    )
    this.getContact();
  }

  getContact() {
    if (this.contactId) {
      this.loading = true
      this.contactService.getContact(this.contactId).subscribe(
        (response: IContact) => {
          this.contact = response;
          this.loading = false;
          this.getAllGroups();
        },
        error => {
          this.errorMessage = error;
          this.loading = false
        }
      )
    }
  }

  getAllGroups() {
    this.contactService.getAllGroups().subscribe(
      (response: IGroup[]) => {
        this.groups = response;
      },
      error => this.errorMessage = error
    )
  }
  updateContact() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe(
        (response: IContact) => {
          this.router.navigate(['/']).then();
        },
        error => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      )
    }
  }

}
