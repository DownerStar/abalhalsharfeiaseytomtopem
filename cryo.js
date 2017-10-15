const Eris   = require('eris');
const config = require('./config.json');
const bot    = new Eris(config.token);
const moment = require('moment');
moment.locale('pt-br');

const serviceAccount = require('./rpg.json');
const firebase = require('firebase-admin');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fichas-rpg.firebaseio.com/"
});

bot.on("ready", () => {
     console.log('Eu tô on');
    console.log(bot.guilds.map(guild => guild.name).join('\n'));
const status = [
    "Cry!help para ajuda, Cry!invite para me invitar", 
    `Que legal, ${bot.guilds.size} servers estão comigo!`, 
    "Cry!invite pra me invitar! Tenho ótimos comandos e sempre atualizo, pelo menos uma vez por semana!", 
    `Estou alegrando e/ou ajudando ${bot.users.size} usuários!`, 
    `Estou online desde ${moment(bot.startTime).format('LL LTS')}!`,
    `Sabia que eu uso o javascript?? Minha library é eris, na versão: ${require('./node_modules/eris/package.json').version}!`,
    "Meu dono é o Downer(ou enbede)"
];

let currentStatus = 0;

setInterval(() => {
    bot.editStatus("dnd", {    
        name: status[currentStatus], 
        type: 1, url: 'https://www.twitch.tv/nitrorocketleague' 
    });
    currentStatus++;
    if (currentStatus >= status.length) currentStatus = 0;
}, 30000);
});


let comandos = {
	'Cry!': {
		help: {
			desc: 'Mostra todos os comandos',
			exec: (msg, suffix) => {
				let lista = [];
				for (let i in comandos['Cry!']) {
					if (i == 'help') continue;
					lista.push({name: `Cry!${i}`, value: `${comandos['Cry!'][i].desc}`, inline: true});
				}
				msg.channel.createMessage({
					embed: {
						thumbnail: {
					url: bot.user.dynamicAvatarURL('png', 2048)
				},
						fields: lista
					}
				});
			}
		},
		info: {
			desc: 'Mostra as informações do bot',
			exec: (msg, suffix) => {
				msg.channel.createMessage({
					embed: {
						 color: Math.floor(Math.random() * 16777216),
						 title: 'Bot Info :name_badge:',
						 description: 'informações sobre o bot.',
						 thumbnail : {
							 url: bot.user.avatarURL
						 },
						 fields: [
						 {
							 name: 'Olá, eu sou o Cryokus, um bot bem (in)útil que tem uns comandos estranhos ai',
							 value: 'eu fui originalmente criado pelo <@266947496243101697>.'
						 },
						 {
							 name: 'Lib :books:  ',
							 value: `eris versão: ${require('./node_modules/eris/package.json').version}. `
						 },
						 {
							 name: 'Start Time :runner:  ',
							 value: moment(bot.startTime).format('LL LTS')
						 },
						 {
							 name: 'Ping :ping_pong:  ',
							 value: 'Use o comando Cry!Ping'
						 },
						 {
							 name:'Meus prefixos:',
							 value: 'Prefixo normal: *Cry!help* \n Prefixo adicional: *Hotel?help* \n Prefixo para RPG: *$help*'
						 },
						 {
							 name: 'Número de servers :computer:  ',
							 value: bot.guilds.size
						 },
						 {
							 name: 'Número de canais :tv:  ',
							 value: Object.keys(bot.channelGuildMap).length
						 },
						 {
							 name: 'Número de usuários :busts_in_silhouette:  ',
							 value: bot.users.size
						 }
					 ]
				   }
				});
			}
		},
		
		sobre: {
			desc: 'Mostra as informações sobre o bot',
			exec: (msg, suffix) => {
				msg.channel.createMessage({
					embed: {
						 color: Math.floor(Math.random() * 16777216),
						 title: 'Sobre mim',
						 description: '------------',
						 thumbnail : {
							 url: bot.user.avatarURL
						 },
						 fields: [
						 {
							 name: 'Oie, eu sou o cryokus, um bot bem (in) útil para lotar seu server do discord de alegria! :smiley:',
							 value: 'eu fui originalmente criado pelo <@266947496243101697>, que me tratou bem e cuidou de mim, toda semana me deixando hibernar!'
						 },
						 {
							 name: 'Atualmente eu uso a host Heroku!',
							 value: 'Eu gosto muito dessa host! :smile: [Clique aqui para visitar o site!](https://dashboard.heroku.com)  \n \n se quiser meu link de invite, use Cry!invite ou [Clique Aqui!](https://discordapp.com/oauth2/authorize?client_id=361596190279598090&scope=bot&permissions=268561430 )'
						 },
						 {
							 name: 'o enbede tem um canal do youtube tambem.',
							 value: '[Clique aqui para visitar!](https://www.youtube.com/channel/UCpakxn52JbxFvBZi7CwbOew)'
						 },
						 {
							 name: 'Créditos:',
							 value: 'Bot criado e desenvolvido por <@266947496243101697> (segundo owner do bot: <@276046237260578817> )  \n com ajuda do <@212289718715547648>, do <@106915215592923136>, do <@226471931241693194> e do <@226489446264995841> nos comandos'
						 } 
					 ]
				   }
				});
			}
		},
		
		invite: {
    desc: 'meu invite',
    exec: (msg, suffix) => {
        msg.channel.createMessage(':mailbox_with_mail: Mandei lá na DM! ' );
        bot.getDMChannel(msg.author.id).then(dm => dm.createMessage("https://discordapp.com/oauth2/authorize?client_id=361596190279598090&scope=bot&permissions=268561430 "));
    }
},
		dog: {
			desc: 'um dog legal pra animar a vida',
			exec: (msg, suffix) => {
				bot.createMessage(msg.channel.id, "http://imgur.com/r/dogs/PuLsUZI");
			}
		},
		hot: {
			desc: 'algo bem quente.',
			exec: (msg, suffix) => {
				bot.createMessage(msg.channel.id, "http://imgur.com/Y6nE1xO");
			}
		},
		nemligo: {
			desc: 'um dedo do meio. Que coisa feia, George!',
			exec: (msg, suffix) => {
				bot.createMessage(msg.channel.id, ":middle_finger: ");
			}
		},
		userinfo: {
			desc: 'info de user',
			exec: (msg, suffix) => {
				if (msg.channel.guild == 'undefined') return;
				function getEmbed(member, user) {
					return {
						embed: {
							color: Math.floor(Math.random() * 16777216),
							title: 'UserInfo :name_badge: ',
							description: 'informações sobre o usuário' , 
							thumbnail : {
								url:  member.avatarURL
							},
							fields: [ 
								{
									name: 'Nome :ideograph_advantage: ',
									value: member.username
								},
								{
									name: 'Apelido :eyes:',
									value: member.nick || 'SEM NICK'
								},
								{
									name: 'Status :red_circle:',
									value: member.status
								},
								{
									name: 'Jogando :video_game:',
									value: member.game ? member.game.name : 'SEM JOGO'
								},
								{
									name: 'Entrou em :calendar:',
									value: moment(member.joinedAt).format('LL LTS')
								},
								{
									name: 'Conta discord criada em :calendar:',
									value: moment(user.createdAt).format('LL LTS')
								},
								{
									name: 'Cargos :hole: ',
									value: member.roles.map(r => member.guild.roles.get(r).name).join(', ') || 'SEM CARGO'
								}
							]
						}
					};
				}
				if (msg.mentions[0])
					return msg.channel.createMessage(getEmbed(msg.channel.guild.members.get(msg.mentions[0].id), msg.mentions[0]));
				else
					return msg.channel.createMessage(getEmbed(msg.member, msg.author));
			}
		},
		
		ping: {
			desc: 'meu ping!',
			exec: (msg, suffix) => {
		bot.createMessage(msg.channel.id, '.').then(message => {message.edit(`**Pong** \n ${message.timestamp - msg.timestamp}ms `)});
			}
		},
		
		roleinfo: {
			desc: 'info de cargo',
			exec: (msg, suffix) => {
				let role = msg.channel.guild.roles.find(r => r.name.toLowerCase() == suffix.toLowerCase());
				if (!role) return msg.channel.createMessage('Esse cargo não existe');
				msg.channel.createMessage({
					embed: {
						color: Math.floor(Math.random() * 16777216),
						title: 'RoleInfo :name_badge:' ,
						description: 'informações do cargo' , 
						thumbnail : {
							url: msg.channel.guild.iconURL
						},
						fields: [
						{
							name: 'Nome :heavy_check_mark: ',
							value: role.name
						},
						{
							name: 'ID :id:',
							value: role.id
						},
						{
							name: 'Posição :cartwheel:  ',
							value: role.position
						},
						{
							name: 'Mencionável :speaking_head: ',
							value: role.mentionable
						},
						{
							name: 'Criado em :calendar:',
							value: moment(new Date(role.createdAt)).format("D [de] MMMM [de] YYYY, [às] HH:mm")
						},
						{
							name: 'Cor (hex) :hash:',
							value: '#' + role.color.toString(16)
						}
					]
					}
				});
			}
		},
		serverinfo: {
			desc: 'info de server',
			exec: (msg, suffix) => {
				msg.channel.createMessage({
					embed: {
						color: Math.floor(Math.random() * 16777216),
						title: 'ServerInfo :name_badge:' ,
						description: 'informações do server' , 
						thumbnail : {
							url: msg.channel.guild.iconURL
						},
						fields: [
							{
								name: 'Nome :speech_balloon: ',
								value: msg.channel.guild.name
							},
							{
								name: 'ID do server :id:',
								value: msg.channel.guild.id
							},
							{
								name: 'Dono :thinking: ',
								value: '<@' + msg.channel.guild.ownerID + '>' 
							},
							{
								name: 'Membros :busts_in_silhouette: ',
								value: msg.channel.guild.memberCount
							},
							{
								name: 'Nível de verificação :diamonds: ',
								value: msg.channel.guild.verificationLevel
							},
							{
								name: 'Emojis :smile: ',
								value: msg.channel.guild.emojis.length || 'Sem emojis'
							},
							{
								name: 'Criado em :calendar: ',
								value: moment(new Date(msg.channel.guild.createdAt)).format("D [de] MMMM [de] YYYY, [às] HH:mm")
							},
							{
								name: 'AFKTime :mute:',
								value: msg.channel.guild.afkTimeout
							},
							{
								name: 'Cargos :hole: ',
								value: msg.channel.guild.roles.size || 'sem roles'
							},
							{
								name: 'Região :earth_americas: ',
								value: msg.channel.guild.region
							}
						]
					}
				});
			}
		},
		cookie: {
			desc: 'uns cookie legal pra sua internet',
			exec: (msg, suffix) => {
			   bot.createMessage(msg.channel.id, "Toma aí: http://i.imgur.com/enaNdcI.jpg ");
			}
		},
		np: {
			desc: 'não perguntei, algo assim',
			exec: (msg, suffix) => {
			   bot.createMessage(msg.channel.id, " Mano, ninguém perguntou tá ligado? vai viver sua vidinha de merda e me dexa em paz caramba <\3 te odeio! mentira volta pra mim ! ");
			}
		},
		pd: {
			desc: 'pede desculpa pra alguem',
			exec: (msg, suffix) => {
				if (msg.mentions[0]) 
					return msg.channel.createMessage(msg.mentions[0].mention + " foi mal </3 toma um cookie pra me desculpar, q : http://i.imgur.com/enaNdcI.jpg");
				else 
					return msg.channel.createMessage(msg.author.mention + " mencione quem você quer se desculpar com.");
		   }
		},
		say: {
			desc: 'digo algo que você quiser',
			exec: (msg, suffix) => {
				var prfx = msg.content.slice(8);
				bot.createMessage(msg.channel.id, {
					embed: {
						title: prfx,       
						color: ~~(Math.random() * 16777216),
						description: 'Hotel?Trivago',
						footer: {
							icon_url: msg.author.avatarURL,
							text: 'Dito por '+msg.author.username+'.'
						}
					}
				});
			}
		},
		flood: {
			desc: 'flooda pra vc não ser ban',
			exec: (msg, suffix) => {
				bot.createMessage(msg.channel.id, 'Achou que ia ter flood né? BAN NELE');
			}
		},
		NSFW: {
			desc: 'Nunca Se Faça Walter, mentira, uns r34 estranho',
			exec: (msg, suffix) => {
				if (msg.channel.name != 'NSFW') return msg.channel.createMessage('Comando exclusivo para `#NSFW`');
		 
				let imagens = ["rule34 \n http://img.rule34.xxx/images/2123/98c579999d481d5f4d3cd67c158d5e1507cbac81.gif", "rule34 \n https://lolibooru.moe/data/preview/d8c58143a562178a857bbf2b682a73db.jpg", "rule34 \n https://lolibooru.moe/data/preview/10b3c26fe021a888a8cc7fd4bae3ed35.jpg", "rule34 \n http://img.rule34.xxx/images/2125/9d44e61a830f3832979e3223d8455fc9.jpeg", "rule34 \n http://img.rule34.xxx/images/1823/690307a2dea1bc08f45400057f72e8bf.jpeg", "rule34 \n http://img.rule34.xxx/images/2120/5562180e4001ca2854270785c595c27363a6a4e9.jpeg", " rule34 \n http://img.rule34.xxx/images/2131/12190fe927a3e4fdd2e25268a4acbbb2.gif", "rule34 \n http://img.rule34.xxx/images/990/ef33f6ca578aadd07296f5c8c802b3a258fa24e4.jpeg"],
					imagemEscolhida = imagens[~~(Math.random() * imagens.length)];
				msg.channel.createMessage(imagemEscolhida + '  :game_die:');
				}
		},
		RandomSU: {
			desc: 'Envia uma imagem aleatória de Steven Universo',
			exec: (msg, suffix) => {
				if (msg.channel.name != 'memes') return msg.channel.createMessage('Comando exclusivo para  `#memes`');
				
				let imagens = ["http://imgur.com/r/stevenuniverse/JUjmf", "http://imgur.com/r/stevenuniverse/lrWkuS6", "http://imgur.com/r/stevenuniverse/nW2Iwo3", "http://imgur.com/r/stevenuniverse/eNMgW7k", "http://imgur.com/r/stevenuniverse/j1svARN", "http://imgur.com/r/stevenuniverse/WtxZ2W7", "http://imgur.com/r/stevenuniverse/PQCOd", "http://imgur.com/r/stevenuniverse/yqA1H0h"],
					imagemEscolhida = imagens[~~(Math.random() * imagens.length)];
				msg.channel.createMessage(imagemEscolhida + ' :game_die:');
			}
		},
		eval: {
			desc: 'Evalua uma expressão JavaScript (só o enbede usa :v)',
			exec: (msg, suffix) => {
				if (msg.author.id !== '266947496243101697') return;
				function evaluate(exp) {
					let result = '~eval failed~';
					try {
						result = eval(exp);
					}
					catch(error) {
						return msg.channel.createMessage(`:x: | ${err} e você Errow !`);
					}
					if (result !== '~eval failed~') {
						return msg.channel.createMessage(result);
					}
				}
				evaluate(suffix);
			}
		},
		ChangeNick: {
			desc: 'Troca o meu nick nesse servidor(comando exclusivo pro enbede)',
			exec: (msg, suffix) => {
				if (msg.author.id !== '266947496243101697') return; 
				msg.delete();
				suffix = suffix ? suffix : 'Cryokus';
				msg.channel.createMessage('**Alterando nick...**').then(m => {
					setTimeout(() => {
						m.edit(`Nick alterado com sucesso para: ${suffix}`);
					}, 1213);
				});
				msg.channel.guild.editNickname(suffix);
			}
		}
	},
	'Hotel?': {
		help: {
			desc: 'Mostra todos os comandos',
			exec: (msg, suffix) => {
				let lista = [];
				for (let i in comandos['Hotel?']) {
					if (i == 'help') continue;
					lista.push({name: `Hotel?${i}`, value: `${comandos['Hotel?'][i].desc}`, inline: true});
				}
				msg.channel.createMessage({
					embed: {
						thumbnail: {
					url: bot.user.dynamicAvatarURL('png', 2048)
				},
						fields: lista
					}
				});
			}
		},
		Trivago: {
			desc: 'Hotel?Trivago!',
			exec: (msg, suffix) => {
				bot.createMessage(msg.channel.id, {embed:{ color: Math.floor(Math.random() * 16777216),title: "Trivago",description: "Já procurou alguma vez hotel na internet? Você reparou a quantidade de preços diferentes que o mesmo quarto pode ter? Em vez de perder horas procurando, deixe que o Trivago facilite a sua busca pelo hotel ideal com o melhor preço. Trivago compara os preços de mais de setecentos mil hotéis e mais de duzentos sites de reserva de uma só vez, é só acessar trivago.com.br, digitar o lugar para onde quer viajar. Com apenas dois cliques escolher as datas de entrada e de saida e então é só buscar, simples assim, o Trivago procura em centenas de sites de reserva e mostra os melhores hotéis. Você pede o preço máximo que quer gastar por noite, a categoria do hotel e até filtrar pelas avaliações dos usuários, não se esqueça, Trivago mostra todos os preços disponíveis para o mesmo quarto de hotel assim sem dúvida você vai encontrar o seu hotel ideal pelo melhor preço com trivago.com.br. Hotel? Trivago.", footer:{ text: 'by ' + msg.author.username + ' #' + msg.author.discriminator}}});
			}
		}
	},
	'$': {
		help: {
            desc: 'Mostra todos os comandos para rpg',
            exec: (msg, suffix) => {
                let lista = [];
                for (let i in comandos['$']) {
                    if (i == 'help') continue;
                    lista.push({name: `\$${i}`, value: `${comandos['$'][i].desc}`, inline: true});
                }
                msg.channel.createMessage({
                    embed: {
                        thumbnail: {
                    url: bot.user.dynamicAvatarURL('png', 2048)
                },
                        fields: lista
                    }
                });
            }
        },
		inviterpg: {
			desc: 'invite pro server de RPG br que usa esses comandos',
    exec: (msg, suffix) => {
        msg.channel.createMessage(':mailbox_with_mail: Mandei lá na DM! ' );
        bot.getDMChannel(msg.author.id).then(dm => dm.createMessage(" https://discord.gg/ChgQJsP "));
    }
},
		
		ficha: {
            desc: 'Você pode enviar sua ficha que eu armazeno de boa!',
            exec: (msg, suffix) => {
            let args = suffix.split(/(\n| )/);
             let ficha = args[0];
firebase.database().ref().child('users/' + msg.author.id + '/' + ficha).set(args.slice(1).join(' '));    
                
            }
        },
		
		sendficha: {
              desc: 'Envio sua ficha!',
              exec: (msg,suffix) => {
         if (!suffix) return msg.channel.createMessage('especifique uma ficha');
           firebase.database().ref().child('users/' + msg.author.id).once('value', obj => {
     if (obj.val()[suffix]) {
         return msg.channel.createMessage(obj.val()[suffix]);
     } else {
         return msg.channel.createMessage('Essa ficha não existe');
     }
       });
    }
 },
		
		roll: {
			desc: 'Rola um dado de x lados ou x dados de x lados',
			exec: (msg, str) => {
				let	suffix = str.split(' '),
					lados = Number(suffix[0].split('d')[0]),
					dados = suffix[0].split('d').length > 1 ? Number(suffix[0].split('d')[1]) : 1,
					soma  = suffix.length > 1 ? Number(suffix[1]) : 0,
					final = [];
				for (let i = 0; i < dados; i++) {
					let lado = ~~(Math.random() * lados);
					final.push(lado);
				}
				msg.channel.createMessage(`
${msg.author.mention} :game_die: **Resultado**: ${final.reduce((ant, curr) => ant + curr) + soma}
${final.join(' + ')}${soma ? ' +' + soma : ''} = ${final.reduce((ant, curr) => ant + curr) + soma}
				`);
			}
		}
	}
};
	
bot.on('messageCreate', (msg) => {
	for (let i in comandos) {
		let nome   = msg.content.replace(i, '').split(/ |\n/)[0],
			suffix = msg.content.replace(i + nome, '').trim();
		if (msg.content.startsWith(i) && comandos[i][nome]) {
			comandos[i][nome].exec(msg, suffix);
			console.log('O %s usou o comando %s', msg.author.username, nome);
		}
	}
});

bot.connect(process.env.BOT_TOKEN);
