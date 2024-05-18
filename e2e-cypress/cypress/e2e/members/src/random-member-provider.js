import { faker } from '@faker-js/faker';

export class RandomMemberProvider {
  static getMember({ longName = false } = {}) {
    return {
      name: this.getName(longName),
      email: faker.internet.email(),
      labels: faker.word.words({ count: { min: 1, max: 10 } }).split(' '),
      note: faker.word.words({ count: { min: 5, max: 100 } }).slice(0, 500),
      subscribed: faker.datatype.boolean(),
    };
  }

  static getName(long) {
    if (!long) return faker.person.fullName();

    const count = faker.number.int({ min: 50, max: 100 });
    return faker.word.words(1).repeat(count).slice(0, 191);
  }
}
