import { faker } from '@faker-js/faker';

export class PseudoMemberProvider {
  static getMember({
    longName = false,
    invalidEmail = false,
    maxNote = false,
    longEmail = false,
    longLabel = false,
  } = {}) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    let name = faker.person.fullName({ firstName, lastName });
    if (longName) {
      name = name.slice(0, 191);
    }

    let email = faker.internet.email({ firstName, lastName });
    if (invalidEmail) {
      email = email.replace('@', faker.string.symbol(5) + '@');
    }

    if (longEmail) {
      email =
        faker.word
          .words({ count: { min: 20, max: 100 } })
          .replace(/\s/g, '')
          .toLowerCase() + email;
    }

    let note = faker.lorem.paragraph();
    if (maxNote) {
      note = faker.lorem.words(500).repeat(50).slice(0, 500);
    }

    let labels = faker.word.words({ count: { min: 1, max: 10 } }).split(' ');
    if (longLabel) {
      labels = [
        faker.word.words({ count: { min: 100, max: 120 } }).replace(/\s/g, ''),
      ];
    }

    return {
      name,
      email,
      labels,
      note: faker.word.words({ count: { min: 5, max: 100 } }).slice(0, 500),
      subscribed: faker.datatype.boolean(),
    };
  }
}
