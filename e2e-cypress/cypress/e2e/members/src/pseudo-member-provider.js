import { faker } from '@faker-js/faker';

export class PseudoMemberProvider {
  static getMember({ longName = false } = {}) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    let name = faker.person.fullName({ firstName, lastName });
    if (longName) {
      name = name.slice(0, 191);
    }

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