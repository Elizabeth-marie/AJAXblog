exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blog_post').del()
    .then(function () {
      // Inserts seed entries
      return knex('blog_post').insert([
        {
          id: 1,
          title:'Scrunchies...a mistake on repeat',
          content: 'Ah, the 90s. A simpler time where women had no eyebrows, mom jeans were in, and grunge was a lifestyle, not a look. This was the era of the choker, roll on glitter, and the infamous scrunchy. I threw all my scrunches out around age 13, but it appears that one of the most hideous pieces of hairware fashion (aside from the banana clip) has offically  made a comeback.'
        },
        {
          id: 2,
          title:'Is cricket protein the new Beef?',
          content: 'As the population continues to climb, there has been some concern over the sustainability of beef. Cricket farmers, investors, and scientists are working around the clock to come up with a solution. Enter the humble cricket.'
        },
        {
          id: 3,
          title:'Common cooking mistakes to avoid',
          content: 'Sure, these tips may cost you a couple more minutes, but trust me, taking the time will be well worth it...go ahead and tell your friends to start calling you Julia Child.'
        },
        {
          id: 4,
          title:'The best pumps for fall',
          content: 'While the pump has been put on the bakc shelf for many, especially in Colorado, in favor of more practical footwear such as snowboots and running shoes (which, side note, should NEVER be worn unless actually running. Please, please, please, do not wear running shoes with normal clothes), nothing puts together an outfit more quickly like a good pair of pumps. Fall is a perfect time for pumps before the temperature drops, although this year socks with pumps have also been popular, which means you can wear your favorite heels even in the chilly temps'
        }
      ])
    })
    .then(() => {
    return knex.raw("SELECT setval('blog_post_id_seq', (SELECT MAX(id) FROM blog_post));")
  })
};
