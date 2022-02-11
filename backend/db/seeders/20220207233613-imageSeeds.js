'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Images', [
      { userId: 1, imageUrl: 'https://i1.wp.com/mundon.com.br/wp-content/uploads/2020/09/arena-corinthians-itaquerao-1-15.jpg-scaled.jpg?resize=2560%2C1707&ssl=1', content: 'Corinthians Arena from above', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://blog.jovempan.com.br/andreranieri/wp-content/uploads/sites/18/2019/04/arena-corinthians.jpg', content: 'Arena do Corinthians, Brazil', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://cdn.forzaitalianfootball.com/wp-content/uploads/2018/11/Stadio-San-Siro-1200x0-c-default.jpg', content: 'San Siro, Italy', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.musement.com%2Fcover%2F0019%2F16%2Farcadevr-header-1-jpg_header-1815725.jpeg%3F%26q%3D60%26fit%3Dcrop&f=1&nofb=1', content: 'Parc des Princes, France', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://www.lamela.com/wp-content/uploads/2018/06/A_AERM_02.jpg', content: 'Santiago Bernabéu, Spain', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://static.newarena.com/wp-content/uploads/2019/11/Stade-Louis-II-1024x683.jpg', content: 'Stade Louis II, Monaco', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2021/02/A3309-Image-3_Allianz-Arena-Munich-Germany_%C2%A9besthqwallpapers.com_.jpg', content: 'Alianza Arena, Germany', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2021/02/A3309-Image-5_Aviva-Stadium-Dublin-Ireland_%C2%A9avivastadium.ie_.jpg', content: 'Aviva Stadium, Ireland', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2021/02/A3309-Image-35_Estadio-Nacional-Brasilia-Brazil_%C2%A9Marcus-Bredt.jpg', content: 'Estádio Nacional Mané Garrincha, Brazil', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageUrl: 'https://static.newarena.com/wp-content/uploads/2019/11/Luzhniki-Stadium-1024x682.jpg', content: 'Luzhniki Stadium, Russia', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Images', null, {});
  }
};
