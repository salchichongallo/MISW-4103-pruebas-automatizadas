export class PrioriMemberProvider {
  static async getMember() {
    const member = await this.getMockarooMember();
    member.labels = member.labels.split(' ');
    member.note = member.note.slice(0, 500);
    return member;
  }

  static async getMockarooMember() {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('cache-control', 'no-cache');
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('origin', 'https://www.mockaroo.com');

    const raw = JSON.stringify({
      schema: {
        name: '',
        num_rows: 1,
        file_format: 'json',
        line_ending: 'unix',
        table_name: 'MOCK_DATA',
        include_create_sql: false,
        array: false,
        include_nulls: false,
        delimiter: ',',
        quote_char: '"',
        include_header: true,
        bom: false,
        xml_root_element: 'dataset',
        xml_record_element: 'record',
        append_dataset_id: '',
        columns_attributes: [
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 1,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'id',
            position: 0,
            data_type_id: 140,
          },
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 1,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'name',
            position: 1,
            data_type_id: 160,
          },
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 1,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'email',
            position: 2,
            data_type_id: 144,
          },
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 1,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'labels',
            position: 3,
            data_type_id: 151,
          },
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 2,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'note',
            position: 4,
            data_type_id: 153,
          },
          {
            null_percentage: '0',
            values: '',
            list_selection_style: 'random',
            image_format: 'png',
            avatar_height: 50,
            avatar_width: 50,
            character_sequence_format: '',
            countries: '',
            include_protocol: true,
            include_host: true,
            include_path: true,
            include_query_string: true,
            min_date: '05/17/2023',
            max_date: '05/17/2024',
            date_format: '%-m/%-d/%Y',
            image_width_min: 100,
            image_height_min: 100,
            image_width_max: 250,
            file_type: 'common',
            file_name_format: 'camel-caps',
            formula: '',
            min_items: '0',
            max_items: '5',
            min_words: 10,
            max_words: 20,
            min_sentences: 1,
            max_sentences: 10,
            min_paragraphs: 1,
            max_paragraphs: 3,
            style: 'A-',
            min_money: 0,
            max_money: 10,
            money_symbol: '$',
            normal_dist_sd: 1,
            normal_dist_mean: 0,
            normal_dist_decimals: 2,
            min: 1,
            max: 100,
            decimal_places: 0,
            expression: '',
            sequence_start: 1,
            sequence_step: 1,
            sequence_repeat: 1,
            sequence_restart: '',
            sql_expression: '',
            only_us_places: false,
            states: '',
            min_time: '12:00 AM',
            max_time: '11:59 PM',
            time_format: '%-l:%M %p',
            phone_format: '###-###-####',
            dist_probability: 0.5,
            dist_lambda: 1,
            password_min_length: 8,
            password_min_lower: 1,
            password_min_upper: 1,
            password_min_numbers: 1,
            password_min_symbols: 1,
            name: 'subscribed',
            position: 5,
            data_type_id: 129,
          },
        ],
      },
    });

    const response = await fetch(
      'https://www.mockaroo.com/rest/schemas/download?preview=true',
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      },
    );

    return response.json();
  }
}
