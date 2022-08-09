import { USERS } from "./users";

export const POSTS =  [
	{
		imageUrl: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=489&q=80",
		user: USERS[0].user,
		likes: 4117,
		caption: "aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque",
		profile_picture: USERS[0].image,
		comments: [{user: "Frost, Griffith B.",
		comment: "Lorem ipsum dolor sit amet,",},
		]
	},
	{
		imageUrl: "https://images.unsplash.com/photo-1605496036006-fa36378ca4ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
		user: USERS[1].user,
		likes: 2723,
		caption: "cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam",
		profile_picture:  USERS[1].image,
		comments: [{user: "Battle, Leslie L.",
		comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",},
		{user: "Karyn Z. Everett",
		comment: "leo elementum sem, vitae aliquam eros turpis"}]
	},
	{
		imageUrl: "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
		user: USERS[2].user,
		likes: 9738,
		caption: "Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat",
		profile_picture:  USERS[2].image,
		comments: [{user: "Harrington, Asher X.",
		comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing",},
		{user: "Petra M. Frye",
		comment: "dolor sit amet, consectetuer adipiscing elit."}]
	},
	{
		imageUrl: "https://images.unsplash.com/photo-1655009915058-35b152284075?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=412&q=80",
		user: USERS[3].user,
		likes: 7673,
		caption: "enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula",
		profile_picture:  USERS[3].image,
		comments: [{user: "Lester, Geoffrey S.",
		comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",},
		{user: "Burke E. Garza",
		comment: "libero at auctor ullamcorper,"}]
	},
	{
		imageUrl: "https://images.unsplash.com/photo-1659605199215-83f8b3a8b5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
		user: USERS[4].user,
		likes: 8164,
		caption: "bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna",
		profile_picture:  USERS[4].image,
		comments: [{user: "Dean, Cassandra I.",
		comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",},
		{user: "Leroy F. Huff",
		comment: "Donec porttitor tellus non magna. Nam"},
        {user: "Leroy F. Huff",
		comment: "Donec porttitor tellus non magna. Nam"},
        {user: "Leroy F. Huff",
		comment: "Donec porttitor tellus non magna. Nam"},
        {user: "Leroy F. Huff",
		comment: "Donec porttitor tellus non magna. Nam"},
    ]
	}
];