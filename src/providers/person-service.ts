import {Injectable} from '@angular/core';
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

const AddPersonQueryText = gql`
  mutation AddPerson($name: String!,$sex:String!)
  {
    addPerson(name: $name, sex:$sex)
    {
      id,
      name
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
  allPeople: any;
  people: any;

  constructor(private apollo: Apollo) {

    //configure "watch" expressions.

    this.allPeople = this.apollo.watchQuery({
      query: AllPeopleQueryText
    })
  }

  addPerson(newPersonName: string, newPersonSex: string) {
    // optimistic response does not appear to work.  What did I do wrong.
    /*
     ,
     optimisticResponse: {
     __typename: 'Mutation',
     addPerson: {
     __typename: 'Person',
     id: 'some_number',
     name: newPersonName
     },
     }
     */
    this.apollo.mutate({
      mutation: AddPersonQueryText,
      variables: {
        name: newPersonName,
        sex: newPersonSex
      }
    }).subscribe((res: any) => {
      console.log('received response of the mutate', res);
    });
  }

  getAllPeople() {
    console.log('calling all people');
    this.allPeople.refetch();
    return this.allPeople;
  }

  getDetails(pID: string) {
    return new Promise((resolve, reject) => {
      this.apollo.query({
        query: GivenPersonQueryText,
        variables: {
          id: pID
        }
      }).subscribe((res: any) => {

        let ans = res.data.getPerson;
        if (ans) {
          let person = new Person(pID, ans.name, ans.sex);
          console.log('update to getDetails');
          person.matches = ans.matches;
          resolve(person);
        } else {
          reject('could not get person');
        }
      }, (err) => {
        console.error(err);
      }, () => {
        console.log('completed the getDetails');
      });
    });
  }

}
