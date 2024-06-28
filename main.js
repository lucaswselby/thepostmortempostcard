// https://www.w3schools.com/howto/howto_css_menu_icon.asp
const menuIconClick = menuIcon => {
    menuIcon.classList.toggle("change");
    document.getElementsByTagName("NAV")[0].classList.toggle("change");
}

const searchIconClick = () => {
    document.getElementById("searchContainer").classList.toggle("change");
    document.getElementById("results").innerHTML = "";
    document.getElementById("search").value = "";
};

const mobile = () => {
    return matchMedia("only screen and (max-width: 600px)").matches;
}

const feed = () => {
    return document.getElementById("feed") ? document.getElementById("feed") : null;
};

// add header to each page
const createHeader = () => {
    document.getElementsByTagName("HEADER")[0].innerHTML = `<!-- https://www.w3schools.com/howto/howto_css_menu_icon.asp -->
    <div id="menuIcon" onclick="menuIconClick(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    ${mobile() ? `<div id="searchContainer">
        <img src="./searchIcon.png" alt="search icon" onclick="searchIconClick()">
    </div>` : ""}

    <a href="./index.html"><h1 class="font-effect-3d-float">the postmortem postcard</h1></a>

    <nav>
        <ul>
            <li><a href="./index.html">HOME</a></li>
            <li class="dropdownOuter"><a href="./issues.html">ISSUES</a>
                <ul class="dropdownInner">
                    <li><a href="./issue1.html">Issue 1</a></li>
                </ul>
            </li>
            <li><a href="./submissions.html">SUBMISSIONS</a></li>
            <li><a href="./team.html">MEET THE TEAM</a></li>
            <li><a href="./faqs.html">FAQs</a></li>
            <li class="mobileIcon">
                <div onclick="searchIconClick()">SEARCH</div>
                ${!mobile() ? `<div id="searchContainer"></div>` : ""}
            </li>
        </ul>
    </nav>`;
    document.getElementById("searchContainer").innerHTML += `<div id="searchBar">
        <input type="text" id="search" name="search">
        <input type="submit" id="searchButton" value="Search">
    </div>
    <ul id="results"></ul>`;
};

// resizes feed height for desktop and mobile
const root = document.querySelector(':root');
const resizeScreen = () => {
    const headerHeight = document.getElementsByTagName("HEADER")[0].offsetHeight + parseFloat(getComputedStyle(document.querySelector("HEADER")).marginBottom);
    document.getElementsByTagName("MAIN")[0].style.marginTop = `${headerHeight}px`;
    if (feed()) {
        feed().style.height = `calc(${window.innerHeight}px - ${headerHeight + (mobile() ? document.getElementById("homeRight").offsetHeight : 0)}px)`;
    }
    if (document.getElementsByClassName("piece")[0] && document.getElementsByClassName("piece")[0].getElementsByTagName("IMG")[0]) {
        for (let i = 0; i < document.getElementsByClassName("piece")[0].getElementsByTagName("IMG").length; i++)
        document.getElementsByClassName("piece")[0].getElementsByTagName("IMG")[i].style.maxHeight = `calc(100vh - ${document.getElementsByTagName("HEADER")[0].offsetHeight}px - ${getComputedStyle(root).getPropertyValue("--headerShadow")})`;
    }
};

// resizes header on scroll
// https://www.w3schools.com/Css/css3_variables_javascript.asp
const headerFontSize = parseFloat(getComputedStyle(root).getPropertyValue('--headerFontSize'));
const scroll = element => {
    element.onscroll = () => {
        const scrollTop = element.scrollY || element.scrollTop || 0;
        const minSize = 5;        
        const initialFontSize = 7;
        const maxScrollY = 200; // in pixels
        if (scrollTop < maxScrollY) {
            let newHeaderFontSize = initialFontSize - (scrollTop / maxScrollY) * (initialFontSize - minSize);
            root.style.setProperty('--headerFontSize', `${newHeaderFontSize}vw`);
        }
        else {
            root.style.setProperty('--headerFontSize', `${minSize}vw`);
        }
        document.getElementsByTagName("HEADER")[0].style.marginBottom = "0";
        resizeScreen();
    };
      
};

// sharing capabilities for pieces
if (document.getElementById("shareIcons")) document.getElementById("shareIcons").innerHTML = `<a class="share" onclick="copyLink()"><img src="./shareIcon.png" alt="Copy to clipboard" class="darkMode"></a>
<a class="share" onclick="Share.facebook('${document.URL}','${document.getElementsByTagName("H2")[0].innerHTML} by ${document.getElementsByTagName("H3")[0].innerHTML}','IMG_PATH','DESC')"><img src="./facebook_icon.ico" alt="Share on Facebook"></a>
<a class="share" onclick="Share.twitter('${document.URL}','${document.getElementsByTagName("H2")[0].innerHTML} by ${document.getElementsByTagName("H3")[0].innerHTML}')"><img src="./x_icon.svg" alt="Share on Twitter" class="darkMode"></a>`;
// https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
function copyLink() {
     // Copy the title, author, and url
    navigator.clipboard.writeText(`${document.getElementsByTagName("H2")[0].innerHTML} by ${document.getElementsByTagName("H3")[0].innerHTML} ${document.URL}`);
  
    // Alert the copied text
    alert("Copied to clipboard");
}  
// https://www.webdesign.org/html-and-css/tutorials/how-to-create-a-share-button-for-your-site.22180.html
Share = {
    facebook: function(purl, ptitle, pimg, text) {
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(ptitle);
        url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent(ptitle);
        url += '&url=' + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626, height=436');
    }
};

// pieces
class Piece {
    constructor(id, title, author, content, genre, tags) {
        this._id = id; // 102 = issue 1, piece 2
        this._url = `./${title.toLowerCase().replaceAll(" ", "-")}-${author.toLowerCase().replaceAll(" ", "-")}.html`;
        this._title = title;
        this._author = author;
        this._content = content;
        this._genre = genre;
        this._tags = tags;
    }
    get id() {
        return this._id;
    }
    get url() {
        return this._url;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get content() {
        return this._content;
    }
    get genre() {
        return this._genre;
    }
    get tags() {
        return this._tags;
    }
}
const p101 = new Piece(101, "Rose", "Ade Seegmiller", `<p>Every Thursday night, the old warehouse by the river would shake from the deep bass that reverberated inside its walls. Lights would flash up through the second story windows changing colors every ten seconds. Large droves of 20 somethings would pour in after a long day of work or classes. This Thursday is no exception.</p><img src="./Issue1Rose1.gif" alt="Girl with strobe effect"><p>Maddyn walks in alone. She wears a plain black party dress trying to blend in with the rest of the crowd. It wasn't her first time at one of these infamous Thursday night warehouse raves; in fact, not too long ago, it was an oddity for her to miss them. She'd show up with her girls and spend the night dancing and flirting with random strangers, but it'd been a while since that.</p><p>She has been avoiding coming here knowing that the all too familiar blond Alpha Phi Alpha boy would be among the party goers dancing like he had not a care in the world, and why would he have any? His father could pay off just about any problem that might arise in his path.</p><p>Maddyn catches a glimpse of the boy through a temporary part of the fluid dancers. That's all it takes for her to be brought to that night a few weeks ago. She remembers how he brought her back to his place, how he took her upstairs to his room, how he forced her down on his bed. She remembers waking up the next morning in pain. She remembers that pain deep inside. It is the kind of pain that feels like someone has your heart in their hand squeezing it while twisting a dull knife in your abdomen as their knees press down into your lungs, the kind of pain that you experience during a panic attack or when drowning or, I'd imagine, during an asthma attack, the kind of pain that comes from not being able to breath. Maddyn stumbled home that morning not sure what to do. Every part of her felt on fire and the pain took days to fade enough for her to push it aside and get out of bed, to go back to class, to pretend that everything was normal even though we both knew that the normal of before no longer existed.</p><img src="./Issue1Rose2.gif" alt="Boy in letter jacket with strobe effect"><p>The lights go down as the song ends and the current DJ gets off stage. In a few moments, the lights will come back up as a new DJ starts their set. She moves through the crowd cutting through the people like a boat on water to be closer to that stupid frat boy. He'll notice her when the lights come back up. She knows he will dance with her and reintroduce himself without any effort on her part at all.</p><p>For now, he dances to the interlude music surrounded by his frat buddies. They are doing this hyper-heterosexual dance, all with at least a foot between them even though there is not all that much space in the overcrowded room. Taking up too much space is way better in their minds then the chance that someone would mistake them for being a bit gay or comfortable in their masculinity. Maddyn slips between two boys who are eyeing each other up and down longing too afraid to do any more than that. She stands a few paces in front of her target and starts dancing like she did not even notice him there. He smiles that Jekyll of a smile at her, <em>to not be afraid of strangers</em>, and she does her best to conjure up a smile to return it. <em>I want to puke as he approaches her.</em> He dances with her for a second before he leans down to her ear.</p><p>"Trevor," he says. Though he screamed, the words could have very easily been lost in the noise of the room if his lips hadn't been so close to hers.</p><p>When he pulls away, she is able to see his face up close for the first time in two weeks. He hasn't changed a bit. She, on the other hand, looks very different. Her naturally auburn hair now an ashy black, and the extravagant makeup that had been a staple in her party going attire nowhere to be seen. <em>There is no way that he would recognize her even if he had bothered to remember her face.</em></p><p>"Rose," she leans toward him to give the fake name. Another pointless attempt to her identity from a boy who did not care. His smile finds some way to grow. <em>It sends an uneasy feeling through me.</em></p><p>The two dance; his hands rest on her hips making it easier for Maddyn to move him away from his "buddies." The crowd moves like waves cresting to fill the space behind them. They don't speak, just dance. Maddyn finds a way to keep constant contact with him even when his hands move off her hips. She moves him toward the edge of the sea of people. Every once and awhile, she presses a kiss to his cheek or neck to keep that Cheshire smile on his face. Maddyn knows exactly what she's doing. As another song ends, she leans into him and places a lingering kiss to the corner of his lips, then on his cheek, then by his ear.</p><p>"Wanna go somewhere more private?" her voice seems to float over the music leaving Trevor with no words to say. He nods like a helpless, starving puppy that just saw a steak. She pulls him off the dance floor.</p><p>Maddyn takes a brief second to scan the crowd for Trevor's frat buddies. She spots them exactly where they were when she found them earlier. They don't seem to notice that their friend was missing or maybe they don't care. <em>Stupid boys.</em></p><p>Maddyn links her hand with Trevor's and pulls him in the direction of the bathrooms. The hall lighting is nonexistent. All light coming in comes from the large room they just left or the opening of the bathroom doors. The floor is stickier here. Even in the dim light, Maddyn can see couples who came here in search of somewhere more private, just like she did. <em>I need more privacy for this to work.</em></p><p>With her multitude of Thursday nights spent here, Maddyn knows where to go. She leads Trevor down the hall past the bathrooms to a dingy door that looks like it might pop off its hinges at any moment.</p><p>Trevor is the one to open it. He doesn't show care in any sense of the word as he throws it open and pulls her inside. An outsider might even mistake his actions as if they were saying that it was his idea in the first place. Trevor flicks a switch on the wall and a fluorescent light blinks on revealing the room to them. It can't be larger than four feet by four feet; There are shelves stocked to the ceiling with toiletries. In the corner of the room, there's a mop and bucket that likely haven't been touched since the warehouse was still a place of work.</p><p>Maddyn smiles a genuine smile for the first time that night. The way the corners of her mouth tilt up would be alarming for anyone who looked on her with a sober mind, but three shots and one ecstasy pill in, Trevor does not detect a thing.</p><p>He pushes her up against the shelves opposite the door causing the cleaning supplies to shake. As he moves his mouth to cover hers, she breathes out a cloud of black smoke. Its swift and controlled path makes its way directly into him. He loses his footing and stumbles back disoriented. He cannot find any air to fill his lungs. Black spots dance in his vision' he rubs his eyes trying to dispel them. His back now to the door, he braces himself against as he is unable to stand on his own. His lungs, though he can't see them, have black spots rising on them. <em>If only he could see the damage that I have already caused. They look as if he has been smoking for ten years.</em></p><img src="./Issue1Rose3.gif" alt="Girl in silhouette with darkness coming from her hands"><p>Maddyn stands firm with her feet planted shoulder width apart. It is a familiar stance that she remembers being told in elementary school would make her immovable. She hopes that is true now. Her hands are held off to her sides. From her fingertips pours the same black smoke from earlier, except this time, it comes out thicker than before. It dances across the cleaning closet and into Trevor in any and every possible entrance. It goes in through his nose and mouth and ears. It weasels its way around his eyes causing them to cloud over, turning them pitch black. He lets out a strangled cough trying to expel the smoke to no avail. His eyes start to water, but instead of tears blood comes from his tear ducts.</p><p>Maddyn watches as the smoke decays the frat boy from the inside out. Her eyes cloud as well turning black the same as his. The lights above them start to flicker. When he stops making sounds and moving, she calls the smoke back to her fingers. It recedes from him and her too. His eyes remain their dark black color while hers return to the blue that they were before. His body falls limply to the floor like an abandoned puppet, completely devoid of all life, blocking the door. <em>Shit, that might be a problem.</em></p><p>Maddyn reaches over the body of the once frat boy. She yanks at the door, only able to get it open enough for her to slip out. The door closes behind her with a loud thunk. <em>I am not sure when the next person will find the body or what state it will be in by that time, but I am sure that by then it will have decayed enough to get the door open.</em></p><p>Maddyn stands there in the hall, illuminated by the bathroom light that sneaks its way out from the door that continues to open and close like nothing happened and the distant party lights that still flash on and off in multiple colors.  She leans back against the door and takes a deep breath. A sob escapes her lips only to be swallowed up by thumping music. Tears spill down her cheeks. She makes no attempt to brush them away. If you were to look closely you might see that in certain lighting her tears run black. After a few moments, she gathers herself, wipes away the tears, and walks back into the party.</p><img src="./Issue1Rose4.gif" alt="Girl crying black tears"><p>The members of Alpha Phi Alpha are still where she left them no more than 15 minutes ago. Before she turns away from them, she makes note of the two boys that were eyeing each other up earlier are now heavily making out on the dance floor. It is what Maddyn needs to walk away, leaving Trevor's Body and her guilt behind. <em>Now we can move on to the fun stuff.</em></p>`, "fiction", ["horror"]);
const p102 = new Piece(102, "Water", "Ade Seegmiller", `<img src="./WaterAdeSeegmiller.jpg" alt="Water">`, "art", ["drawing"]);
const p103 = new Piece(103, "100 Bad Days", "Ade Seegmiller", `<strong>Day 1: Saturday, December 8<sup>th</sup>, 2018</strong><p>My boyfriend of two years, Charlie, broke up with me. He claimed to have lost his job and now can't afford his rent, so he planned to move back to Connecticut where his parents live until he is able to find another job. He didn't want to try the long-distance thing, and if what he was saying was true then I can honestly say I don't want to try that either. Pretty sure that was all a lie, but I'm not going to beg him to stay. He can be such a self-centered ass sometimes. I guess he was too prideful to ask to stay here. I think it's all an excuse to break up with me at this point. I don't wat to bother anymore.</p><p style="text-align: center;"><em>Note: I should start going on runs in the morning.</em></p><strong>Day 3: Monday, December 10<sup>th</sup>, 2018</strong><p>I left for my first morning run while it was sunny out, but by the time I was two blocks from my house, it had started to rain. If I wasn't soaked when I had gotten back to my street, the car that drove straight through the pothole definitely did the trick. I was so cold when I got home, I decided to throw my work clothes in my dryer before hopping in the shower. The warm water helped me relax, but I spent too much time there that I was late to work. My boss assigned me to an article about mental health issues in adult men for my first article because my coworker, Alice, already started work on the other article they wanted. Alice gave me this dumbass fake smile, and all I could think about was how much I wanted to glug her. It's like she knows something I don't. She's been doing it a lot lately, but today pissed me off more than the rest.</p><strong>Day 7: Friday, December 14<sup>th</sup>, 2018</strong><p>I got a cold from the puddle incident My friends and I had planned this amazing trip for my best friend, Nina's, birthday, but I had to cancel because I couldn't breathe let alone dance on bars. I made the mistake of telling my mother who told my sister, Marley, who decided that I was free to watch her three-year-old son, Jensen, so she and her husband could go out together. She guilt-tripped me into agreeing with the "my husband and I never get time alone" thing. I felt like absolute shit, got next to no work done, and couldn't sleep with Jensen's feet digging into my back all night. I texted Charlie. The asshole left me on read.</p><strong>Day 11: Wednesday, December 19<sup>th</sup>, 2018</strong><p>I stayed late to work on my article in hopes of finishing it with no luck. On my way home, I got a flat tire while on the freeway. My phone was dead, so I couldn't call my insurance company to send a tow truck, and the only place that was open nearby was Mel's Diner. I sobbed in a booth for probably 20 minutes before an elderly woman named Sandra Cooper came along and gave me tissues and held me. She got me a milkshake, and her husband, John, let me use his phone. I stayed with them and listened to them talk about their lives until they had to go home. After they left, my server, Teddy, talked with me until my tow truck came. Everyone there was so nice to me even though I was a sobbing mess.</p><p style="text-align: center;"><em>Note: Mel's diner has good chocolate milkshakes.</em></p><strong>Day 17: Tuesday December 25<sup>th</sup>, 2018</strong><p>My sister and her husband hosted Christmas dinner. They announced that they were having another kid. Everyone was so excited for them. I lost my appetite. My mother asked me when I would be getting married and give her grandchildren. She wasn't happy to hear that I was single out of frustration or anger or loneliness. Charlie and I talked about getting drinks. He claims to have moved back, but why wouldn't he wait until after the holidays to come back, and he wasn't gone for that long. I knew that prick was lying, but I agreed to drinks. I think a part of me misses him. Why else would I have accepted his offer?</p><strong>Day 23: Monday, December 31<sup>st</sup>, 2018</strong><p>My friends invited me out to a club for New Years. It was loud and dingy and smelled like alcohol and sweat. All of them brought their significant others. I was the 7<sup>th</sup> wheel. Nina asked about Charlie. Apparently, she ran into him with Alice last week. She thought I already knew. He such an asshole. I cancelled drinks and blocked his ass.</p><strong>Day 24: Tuesday, January 1<sup>st</sup>, 2019</strong><p>Midnight was awkward. All my friends had their kisses, but they didn't want me to feel left out so they tried to find someone for me to kiss. They settled on this person who looked 22 at the most. They smelled really weird. I couldn't go through with it.</p><p style="text-align: center;"><em>Note: Never kiss a stranger at midnight on New Year's especially if you're sober.</em></p><strong>Day 30: Monday January 7<sup>th</sup>, 2019</strong><p>Alice finished her article and got praise for it from nearly everyone. I'm not sure our boss was too happy. She clutched her coffee mug so tightly that her knuckles were white. I struggled to bit back a smile. It's set to be published in March's edition of our magazine. I got a new puppy; his name is Reyan. He ripped up the bathmat and ate half my bar of soap. I wanted to be mad at him, but he looked at me tat sort of way that I couldn't be angry for too long.</p><p style="text-align: center;"><em>Note: Next time don't leave Reyan in the bathroom.</em></p><strong>Day 34: Friday, January 11<sup>th</sup>, 2019</strong><p>Charlie picked Alice up from work. They went to the Zoo lights. She talked about going all day. I guess Charlie forgot I worked there. I spent some time in the bathroom crying. I ended up leaving work early, and somehow, I ended back up at Mel's Diner. The old couple, the Coopers, were there again. Same with Teddy my server. The three of them made me feel right at home. The Coopers told me all about how proud of Teddy they were because he was paying his way through med school. I laughed with them more than I had in a month. I nearly forgot about my article.</p><strong>Day 39: Wednesday, January 16<sup>th</sup>, 2019</strong><p>Marley lost her baby. I went over to her place to take care of Jensen. She cried all night. Her husband never made it home. I felt foreign and out of place like I shouldn't have been there, but I'm not sure where else I should have been.</p><strong>Day 47: Thursday, January 24<sup>th</sup>, 2019</strong><p>I finished my article, not my best work. The editor agreed and gave me more notes than I could count. I did not make the deadline for March's edition. I spent so much time trying to figure out how to fix it that my eyes were dry and my muscles were sore. I ended up at Mel's again. The Coopers weren't there, but Teddy sat and talked with me for nearly two hours.</p><p style="text-align: center;"><em>Note: Try to get his number next time.</em></p><strong>Day 52: Tuesday January 29<sup>th</sup>, 2019</strong><p>Marley got in a fight with her husband. She called me crying asking if I could take Jensen for the night. I wanted to tell her no. I wanted to find someone else, but she's family. After I picked him up, she went to our mothers. Jensen was riled up and fussy. He threw a fit on the car ride to my place and then again at dinner. I refused to let him watch screens which only made it worse. He colored all over the research I'd just printed for my article before he and Reyan fell asleep together in my bed. Another night of no sleep because of toddler feet in my back. I might just run away from my family.</p><strong>Day 57: Sunday, February 3<sup>rd</sup>, 2019</strong><p>Nina came over for dinner. It'd been a while since I'd seen her. While cooking together, I dropped my phone in the spaghetti sauce. My phone stopped working, and I had to throw out the sauce. Nina basically died laughing while I used her phone to make a call to my cell provider. The guy I got a hold of at my cell company agreed with Nina about the hilarity of the situation. I wish I could've curled up into a ball and buried myself in a field.</p><p style="text-align: center;"><em>Note: Get a new phone after work tomorrow.</em></p><strong>Day 65: Monday, February 11<sup>th</sup>, 2019</strong><p>The March edition goes to print in one week. The proofs came in and Alice's article got a small feature on the cover. I can't stand that stupid smile of hers. I got my second round of edits back: less than last time but still a lot. I'm really starting to hate my editor. I went to Mel's again. The Coopers were back. They talked a lot about their grandchildren. After they left, Teddy and I talked for a while longer like usual. I left with his number.</p><strong>Day 68: Thursday, February 14<sup>th</sup>, 2019</strong><p>Reyan and I sat at home watching Umbrella Academy with Chinese takeout. Charlie drunk texted me asking to see me. I considered it, but Nina texted me a cute picture of her dog sleeping in a heart shaped bed, and I completely forgot to respond. I woke with dozens of "U up?" texts. After deleting all his texts, I had to reblock him. Apparently blocking people doesn't carry over. That's so stupid.</p><strong>Day 72: Monday, February 18<sup>th</sup>, 2019</strong><p>Marley asked if she and Jensen could stay the night because our mother is out of town; I felt too guilty to tell her no. Jensen once again slept in my bed, and Marley stayed in my guest room. I don't understand why he thinks sleeping in my bed is so cool. I wasn't going to attempt to sleep next to him. Instead, I got a lot accomplished on my article. Teddy and I texted as I worked. Apparently, he's got a big pediatrics exam coming up, so he was up late studying.</p><strong>Day 76: Friday, February 22<sup>nd</sup>, 2019</strong><p>Marley stayed at my place all week. She talked to her husband, and together they decided to take more time apart. Thankfully, she wanted to stay at our mother's. I helped her move her and Jensen's stuff there. My mother insisted I stay for dinner. She served us fish, and I just about barfed. Before I had to go, we watched an old Disney movie. Jensen cried when I told him good-bye. Good-byes are hard. When I got home, Reyan had eaten the welcome mat.</p><strong>Day 79: Monday, February 25<sup>th</sup>, 2019</strong><p>My article was approved for publishing. It will be published in the May edition. My boss just nodded my way during the meeting. Alice spilled her coffee on my shirt. I had to bite back my anger and not say anything to her. I texted Teddy. I forgot to tell him about my article because we got to talking about him passing his pediatrics exam. Reyan got so excited when I got home that he peed himself. Nina and I went out for drinks to celebrate. We traded dog, horror stories. Her dog makes Reyan look like an angel.</p><p style="text-alig: center;"><em>Note: Buy more carpet cleaner</em></p><strong>Day 81: Wednesday, February 27<sup>th</sup>, 2019</strong><p>I burnt my lasagna because I forgot to start the timer. I tripped on my own feet, and spilt it all over my floor. Reyan had a great dinner as I sat on the floor and cried. I ended up having a bowl of stale cereal.</p><strong>Day 85: Monday, March 4<sup>th</sup>, 2019</strong><p>My phone died sometime in the night, so my alarm didn't go off. I didn't get to my morning run, and Reyan only got a short walk. I barely made it in time for the morning meeting. I walked into the conference room completely out of breath. I got my new article assignment. It looked like it was going to be just as hard as the last one was, but I know I can handle it. I think I'm still feeling pretty confident after my last article, so maybe I shouldn't be so sure about having this. When I got home from work, Reyan had peed on the carpet in my room. Sometimes, I wish I hadn't gotten a dog. Marley called me to say she and her husband were going to try couples counselling, but she isn't going home just yet. She talked my ear off for over an hour. I went to Mel's. The Coopers were there. They bought me dinner when I told them about the article. Teddy also congratulated me.</p><strong>Day 93: Tuesday, March 12<sup>th</sup>, 2019</strong><p>They got my order wrong at the smoothie place on my way to work. I had a minor allergic reaction to the pineapple they put in my drink and felt like puking all day. Teddy offered to come over and take Reyan on a walk so that I could stay in bed. After Reyan was walked, we watched the first Harry Potter movie; he had never seen it. I fell asleep with my head on his shoulder. He woke me up and helped me into bed before he left. It means a lot that he'd do all that for me.</p><strong>Day 96: Friday, March 15<sup>th</sup>, 2019</strong><p>Alice got reprimanded in front of the whole office for being late too many times. I felt bad, so I did my best to comfort her after our boss had left. The two of us went out for lunch, and she told she feels bad about her writing. I wasn't sure how to comfort her, so I just listened. Teddy and I officially went out on our first date. I thoughtlessly ordered cauliflower wings and the sauce got everywhere. We had a good laugh about it.</p><strong>Day 100: Monday, March 18<sup>th</sup>, 2019</strong><p>I got the proof for my article. Seeing my name in print made me so excited that I puked a little, luckily no one saw. Marley and Jensen moved back home. Reyan and I finished Umbrella Academy. Teddy asked me out again. We spent an hour on the phone. I told him about the past 100 days. He said that he as glad that they'd happened because without them we wouldn't have met. I couldn't help but agree. Without the past 100 days, I wouldn't have gotten my dog, or seen my sister struggle, or met Teddy or finished an article that I'm so proud of.</p>`, "fiction", []);
const p104 = new Piece(104, "Oxy", "Ade Seegmiller", `<p>I was thirteen and a half when I broke my leg in a car accident. My father blamed himself. He was the one that was driving and walked away without a scratch. There was no way of knowing we would be T-boned by a drunk driver that night. I told him not to worry about it.</p><p>At the hospital, the doctors told my father that my femur was shattered, and that it would take multiple surgeries and months of healing before I could start physical therapy and walk again. I was put on oxycodone for pain and was scheduled for one of many surgeries.</p><p>I took the pills they'd given me every day; any time it started to throb, I'd be given another, month after month, surgery after surgery, until my physical therapy started. I was told that if the pain became too much we would postpone, but I needed to get back on my feet, so I didn't say anything. Now fourteen and in control of my own pills, I upped my dose. I couldn't handle the babying from my father who felt guilty for walking away without a scratch.</p><p>I got back on my feet, but by then, it was too late. I needed the oxycodone. I needed it like I needed air. When my prescription ran out, I had to find somewhere else to get it from. I turned to someone I thought was a friend. He sold me fentanyl, told me it was better than oxy. I took some. Then I took a lot.</p><p>That's how I ended up here. That's how I ended up dead pleading about why I deserve another chance. Because how was I supposed to know that the stuff the doctors prescribed would lead to an addiction that would ultimately kill me.</p>`, "fiction", []);
const p105 = new Piece(105, "The Rain", "Ade Seegmiller", `<p>It rained last night, the kind of rain where lightning strikes the ground and thunder shakes all of the buildings. It was sound loud that if I closed my eyes and only focus on the rain that the thunder could be felt in my bones. It was even louder than that time that we laid on the floor watching the lightning light up the room. Do you remember that night?</p><p>I was up to almost three in the morning just listening to the rain hit my bedroom window. I'm not a huge fan of thunderstorms or of lightning for that matter. Something about them always makes me quake as if I am one step away from utter disaster.</p><p>I tried to distract myself with my thoughts which you know is a bad idea. For some reason, I kept thinking about how you didn't even know it was raining. You were asleep and had no idea. When you wake up tomorrow, all the rain will have dried up, and you'll never even know that it rained at all.</p><p>Would you even think to look for the signs of rain? Probably not. Why would you? It's not like there was any indication it was going to rain before you went to bed, otherwise you wouldn't have fallen asleep. After all, you hated to miss that kind of rain. It was always your favorite; you said it was something about the way the lighting lit up the sky and the chance that if it touched down what it might bring with it. It soothed you in some weird way.</p><p>I thought maybe if I saw you tomorrow that I'd mention the storm, but I decided it was best if I didn't. How could I? You'd be mad that you missed it. I can't handle you mad. As a matter of fact, I can't handle any emotions well. That's why it's not good to be left in my thoughts.</p><p>I should tell you; while it was raining last night and I was watching the lightning strike and listening to the thunder, I was thinking about us. I was thinking about that night on the floor, about the way you looked at me, about the way you told me that the rain was no reason to be afraid, about the way you said it so condescending like I was child who had been awoken by a bad dream about dancing food.</p><p>It was then as a bolt of lightning lit up my room that I decided that I was glad that you didn't know that it was raining and that you'd never know it had rained that night unless someone else where to tell you. I was then that I decided that I didn't want to tell you anything about the rain, that the rain was mine and mine alone. It was something for me that I could keep, and you couldn't touch, that you couldn't break, that you couldn't taint with your words that seem sweet until one realizes that you're twisting them into something that makes them feel inferior.</p><p>This rain. It was mine.</p>`, "fiction", []);
const pieces = [p101, p102, p103, p104, p105];
pieces.forEach(piece => {
    const pieceElement = document.getElementById(`p${piece.id}`);
    if (pieceElement) {
        pieceElement.innerHTML = piece.content;

        // replaces images with clickable images
        if (!document.getElementsByClassName("imgPreview")[0]) {
            for (let i = 0; i < pieceElement.getElementsByTagName("IMG").length; i++) {
                const pieceImgElement = pieceElement.getElementsByTagName("IMG")[i];
                const newPieceImgElement = document.createElement("img");
                newPieceImgElement.src = pieceImgElement.src;
                newPieceImgElement.alt = pieceImgElement.alt;
                const pieceImgAnchor = document.createElement("a");
                pieceImgAnchor.href = pieceImgElement.src;
                pieceImgAnchor.appendChild(newPieceImgElement);
                pieceImgElement.replaceWith(pieceImgAnchor);
            }
        }
    }
});

// https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/#
const stripHTML = html => {
    return html.replaceAll(/(<([^>]+)>)/ig, '');
};

// searches pieces for matching search value
const search = () => {
    const searchValue = document.getElementById("search").value;
    if (searchValue) {
        document.getElementById("results").innerHTML = "";
        const results = document.getElementById("results");

        // creates a new search result
        const newResult = (piece, attribute) => {
            const result = document.createElement("li");
            result.className = "result";
            result.id = piece.id;
            result.innerHTML = `<a href="${piece.url}">${piece.title} by ${piece.author}</a>`;
            if (attribute === "content") {
                const additionalCharacters = 30; // added to search value for context on either side
                let context = piece.content.replaceAll("><p>", "><p> "); // when paragraphs are removed, add a space to separate words
                context = stripHTML(context); // remove tags
                let startIndex = context.toLowerCase().indexOf(searchValue.toLowerCase()) - additionalCharacters;
                let endIndex = startIndex + searchValue.length + additionalCharacters * 2;
                context = context.substring(startIndex, endIndex);
                if (context.includes(" ") && context.includes(context.substring(context.indexOf(" " + 1)))) context = context.substring(context.indexOf(" ") + 1, context.lastIndexOf(" ")); // removes incomplete words
                startIndex = context.toLowerCase().indexOf(searchValue.toLowerCase());
                endIndex = startIndex + searchValue.length;
                context = `${context.slice(0, startIndex)}<span style="background-color: var(--secondaryBackground)">${context.slice(startIndex, endIndex)}</span>${context.slice(endIndex, endIndex + additionalCharacters)}`; // highlight searched term
                result.innerHTML += `: "...${context}..."`;
            }
            return result;
        };

        // adds results
        pieces.forEach(piece => {
            if (piece.title.toLowerCase().includes(searchValue.toLowerCase()) && !document.getElementById("results").innerHTML.includes(`id="${piece.id}"`)) {
                results.appendChild(newResult(piece, "title"));
            }
        });
        pieces.forEach(piece => {
            if (piece.author.toLowerCase().includes(searchValue.toLowerCase()) && !document.getElementById("results").innerHTML.includes(`id="${piece.id}"`)) {
                results.appendChild(newResult(piece, "author"));
            }
        });
        pieces.forEach(piece => {
            if (piece.genre.toLowerCase().includes(searchValue.toLowerCase()) && !document.getElementById("results").innerHTML.includes(`id="${piece.id}"`)) {
                results.appendChild(newResult(piece, "genre"));
            }
        });
        pieces.forEach(piece => {
            if (piece.tags.map(tag => tag.toLowerCase()).includes(searchValue.toLowerCase()) && !document.getElementById("results").innerHTML.includes(`id="${piece.id}"`)) {
                results.appendChild(newResult(piece, "tags"));
            }
        });
        pieces.forEach(piece => {
            if (stripHTML(piece.content.toLowerCase()).includes(searchValue.toLowerCase()) && !document.getElementById("results").innerHTML.includes(`id="${piece.id}"`)) {
                results.appendChild(newResult(piece, "content"));
            }
        });

        // no results
        if (!document.getElementById("results").innerHTML) {
            document.getElementById("results").innerHTML = "<li class=\"result\">You done fucked up. Try again.</li>";
        }

        // clear search bar
        document.getElementById("search").value = "";
    }
};

// resizing the window still loads all functions
const loadFunctions = () => {
    createHeader();
    resizeScreen();
    scroll(feed() ? feed() : window);

    // searches on submit or enter
    document.getElementById("searchButton").onclick = search;
    document.getElementById("search").addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });
};
loadFunctions();
window.onresize = loadFunctions;