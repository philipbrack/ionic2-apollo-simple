import {AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Person, PersonService} from '../../providers/person-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public partialPeople: Person[];
  public wholePerson: Person;

  constructor(private personService: PersonService, public alertCtrl: AlertController) {
    this.partialPeople = [];
    this.wholePerson = null;

    this.personService.getAllPeople()
      .subscribe((res: any) => {
        console.log('update to getAllPeople');
        this.partialPeople = res.data.persons;
      });
  }

  addPerson(): void {
    let prompt = this.alertCtrl.create({
      title: 'Add Person',
      message: "Provide info",
      inputs: [
        {
          name: 'fName',
          placeholder: 'ann'
        },
        {
          name: 'sex',
          placeholder: 'female'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.personService.addPerson(data.fName, data.sex);
          }
        }
      ]
    });
    prompt.present();


  }

  getPeople(): void {
    this.personService.getAllPeople();
  }

  personSelected(partialPerson) {
    this.personService.getDetails(partialPerson.id)
      .then((person: Person) => {
        this.wholePerson = person;
      })
      .catch(err => console.error(err));
  }

}
