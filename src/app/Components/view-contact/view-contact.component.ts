import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { IContact } from 'src/app/Models/icontact';
import { IGroup } from 'src/app/Models/igroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  loading: boolean = false;
  contact: IContact = {} as IContact;
  contactId: string | null = null;
  errorMessage: string | null = null;
  group: IGroup = {} as IGroup;

  constructor(private activateRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      (param: ParamMap) => {
        this.contactId = param.get('contactId');
      }
    );
    this.getContact();
  }

  getContact() {
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (response: IContact) => {
          this.contact = response;
          this.loading = false;
          this.getGroup();
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      )
    }
  }

  getGroup() {
    this.contactService.getGroup(this.contact).subscribe(
      (reponse: IGroup) => {
        this.group = reponse;
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  public notEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
  }
}
