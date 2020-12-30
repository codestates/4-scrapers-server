'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        id: '1',
        category: '정치'
      },
      {
        id: '2',
        category: '경제'
      },
      {
        id: '3',
        category: '연예'
      },
      {
        id: '4',
        category: '스포츠'
      },
      {
        id: '5',
        category: '사회'
      },
      {
        id: '6',
        category: '생활/문화'
      },
      {
        id: '7',
        category: '세계'
      },
      {
        id: '8',
        category: 'IT/과학'
      },
      {
        id: '9',
        category: '기타'
      },
      {
        id: '10',
        category: ''
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};