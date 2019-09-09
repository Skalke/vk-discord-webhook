//библиотеки
const Discord = require('discord.js')
const easyvk = require('easyvk')

//подключаем webhook дискорда
const hook = new Discord.WebhookClient('ид бота-вебхука', 'токен его же')

//Подключаемся к ВК
easyvk({
  access_token: 'токен вк ',
}).then(vk => {
  //Создаем longpoll
  const LPB = vk.bots.longpoll

  LPB.connect({
  	forGetLongPollServer: {},
  	forLongPollServer: {}
  }).then(({connection}) => {
    //Срабатывает, когда появляется новый пост
  	connection.on('wall_post_new', (post) => {
  		 if (post.text.search('#discord_gang') > -1){ //срабатывание на хэштег
        //создаем richembed
        var embed = new Discord.RichEmbed()
        .setTitle('Новый пост') // заголовок для поста
        .setDescription(post.text) //основной блок поста
        .setURL(`https://vk.com/lanplayopen?w=wall${post.owner_id}_${post.id}`) //ставим ссылку
        .setColor(`#30D5C8`) //ставим цвет
        
        if (post.attachments){ //если у поста есть вложения
          if (post.attachments[0].type = 'photo'){ //и первое вложение - фото (я бы проверил другие, но мне реально похуй)
            //ищем ссылку на изображение
            var sizes = [`w`, `z`, `y`, `x`, `m`, `s`] //все типы https://vk.com/dev/photo_sizes
            var url = null
            for (var i = 0; i < sizes.length; i++){ //ищем самый лучший вариант
              var tocheck = post.attachments[0].photo.sizes.find(function(element){return element.type == sizes[i]})
              if (tocheck != undefined){
                url = tocheck.url
                break;
              }
            }
            embed.setImage(url)
          }
        }

        hook.send(embed) //отправляем результат
      }
  	})
  })
})
