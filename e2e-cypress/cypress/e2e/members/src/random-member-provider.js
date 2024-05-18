import { faker } from '@faker-js/faker';

export class RandomMemberProvider {
  static getMember({
    longName = false,
    invalidEmail = false,
    maxNote = false,
  } = {}) {
    return {
      name: this.getName(longName),
      email: this.getEmail(invalidEmail),
      labels: faker.word.words({ count: { min: 1, max: 10 } }).split(' '),
      note: this.getNote(maxNote),
      subscribed: faker.datatype.boolean(),
    };
  }

  static getName(long) {
    if (!long) return faker.person.fullName();

    const count = faker.number.int({ min: 50, max: 100 });
    return faker.word.words(1).repeat(count).slice(0, 191);
  }

  static getEmail(invalid) {
    if (!invalid) return faker.internet.email();
    return faker.internet.email().replace('@', faker.string.symbol(5) + '@');
  }

  static getNote(maxNote) {
    if (!maxNote) return faker.lorem.paragraph();
    return faker.lorem.words(500).slice(0, 500);
  }
}
