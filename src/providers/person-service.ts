import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


// We use the gql tag to parse our query string into a query document
const AllPeopleQueryText = gql`
  query AllPeople {
    persons {
      id,
      name
    }
  }
`;
const GivenPersonQueryText = gql`
  query GetPerson($id: String!) {
    getPerson(id:$id) {
      name
      sex
      matches {
        name
        sex
      }
    }
  }
`;

export class Person {
  public matches: Person[];

  constructor(public id: string, public name: string, public sex: string) {
    this.matches = [];
  }
}
@Injectable()
export class PersonService {

  constructor(private apollo: Apollo) {
  }

  getAllPeople() {
    return new Promise((resolve, reject) => {

      this.apollo.watchQuery({
        query: AllPeopleQueryText
      }).subscribe((res: any) => {
        console.log(res.data.persons);
        resolve(res.data.persons);
      });

    });
  }

  getDetails(pID: string) {
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: GivenPersonQueryText,
        variables: {
          id: pID
        }
      }).subscribe((res: any) => {

        let ans = res.data.getPerson;
        if (ans) {
          let person = new Person(pID, ans.name, ans.sex);
          person.matches = ans.matches;
          resolve(person);

        } else {
          reject('could not get person');
        }
      });
    });
  }

}
