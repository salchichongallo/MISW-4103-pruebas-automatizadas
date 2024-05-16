import { faker } from '@faker-js/faker';
import { MemberProvider } from './member-provider';

export class RandomMemberProvider extends MemberProvider {
  getMember() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      labels: faker.word.words({ count: { min: 1, max: 10 } }).split(' '),
      note: faker.word.words({ count: { min: 5, max: 100 } }).slice(0, 500),
      subscribed: faker.datatype.boolean(),
    };
  }
}
