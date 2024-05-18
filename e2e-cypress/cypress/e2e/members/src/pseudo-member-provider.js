import { faker } from '@faker-js/faker';
import { MemberProvider } from './member-provider';

export class PseudoMemberProvider extends MemberProvider {
  getMember() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = faker.person.fullName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });

    return {
      name,
      email,
      labels: faker.word.words({ count: { min: 1, max: 10 } }).split(' '),
      note: faker.word.words({ count: { min: 5, max: 100 } }).slice(0, 500),
      subscribed: faker.datatype.boolean(),
    };
  }
}
