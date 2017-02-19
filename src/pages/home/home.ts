import {Component} from '@angular/core';
import {Person, PersonService} from '../../providers/person-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public partialPeople: Person[];
  public wholePerson: Person;

  constructor(private personService: PersonService) {
    this.partialPeople = [];
    this.wholePerson = null;
  }

  getPeople(): void {
    this.personService.getAllPeople()
      .then((people: Person[]) => {
        this.partialPeople = people;
      })
      .catch(err => console.error(err));
  }

  personSelected(partialPerson) {
    this.personService.getDetails(partialPerson.id)
      .then((person: Person) => {
        this.wholePerson = person;
      })
      .catch(err => console.error(err));
  }

}
