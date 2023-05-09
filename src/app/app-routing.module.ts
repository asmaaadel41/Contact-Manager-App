import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactManagerComponent } from './Components/contact-manager/contact-manager.component';
import { EditContactComponent } from './Components/edit-contact/edit-contact.component';
import { ViewContactComponent } from './Components/view-contact/view-contact.component';
import { AddContactComponent } from './Components/add-contact/add-contact.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts/admin', pathMatch: 'full' },
  { path: 'contacts/admin', component: ContactManagerComponent },
  { path: 'contacts/add', component: AddContactComponent },
  { path: 'contacts/editContact/:contactId', component: EditContactComponent },
  { path: 'contacts/viewContact/:contactId', component: ViewContactComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
