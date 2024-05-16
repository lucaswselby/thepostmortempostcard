// https://www.w3schools.com/howto/howto_css_menu_icon.asp
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementsByTagName("NAV")[0].classList.toggle("change");
}

// add header and footer to each page
document.getElementsByTagName("HEADER")[0].innerHTML = `<!-- https://www.w3schools.com/howto/howto_css_menu_icon.asp -->
<div class="menuIcon" onclick="myFunction(this)">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div>

<h1>the header</h1>

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
        <li><a href="./search.html">SEARCH</a></li>
    </ul>
</nav>`;
/*document.getElementsByTagName("BODY")[0].innerHTML += `<footer>
    <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/lucaswselby/zine" target="_blank">Zine</a> &copy; 2024 by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/lucaswselby" target="_blank">Lucas Selby</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
</footer>`;*/

// sharing capabilities for pieces
if (document.getElementById("shareIcons")) document.getElementById("shareIcons").innerHTML = `<a class="share" onclick="Share.facebook('${document.URL}','${document.getElementsByTagName("H2")[0].innerHTML} by ${document.getElementsByTagName("H3")[0].innerHTML}','IMG_PATH','DESC')"><img src="./facebook_icon.ico" alt="Share on Facebook"></a>
<a class="share" onclick="Share.twitter('${document.URL}','${document.getElementsByTagName("H2")[0].innerHTML} by ${document.getElementsByTagName("H3")[0].innerHTML}')"><img src="x_icon.svg" alt="Share on Twitter" class="darkMode"></a>`;
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
    constructor(id, url, title, author, content, genre, tags) {
        this._id = id; // 102 = issue 1, piece 2
        this._url = url;
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
const p101 = new Piece(101, "./issue1story1.html", "Rose", "Ade Seegmiller", `<p>Every Thursday night, the old warehouse by the river would shake from the deep bass that reverberated inside its walls. Lights would flash up through the second story windows changing colors every ten seconds. Large droves of 20 somethings would pour in after a long day of work or classes. This Thursday is no exception.</p><img src="./Issue1Rose1.gif" alt="Girl with strobe effect"><p>Maddyn walks in alone. She wears a plain black party dress trying to blend in with the rest of the crowd. It wasn't her first time at one of these infamous Thursday night warehouse raves; in fact, not too long ago, it was an oddity for her to miss them. She'd show up with her girls and spend the night dancing and flirting with random strangers, but it'd been a while since that.</p><p>She has been avoiding coming here knowing that the all too familiar blond Alpha Phi Alpha boy would be among the party goers dancing like he had not a care in the world, and why would he have any? His father could pay off just about any problem that might arise in his path.</p><p>Maddyn catches a glimpse of the boy through a temporary part of the fluid dancers. That's all it takes for her to be brought to that night a few weeks ago. She remembers how he brought her back to his place, how he took her upstairs to his room, how he forced her down on his bed. She remembers waking up the next morning in pain. She remembers that pain deep inside. It is the kind of pain that feels like someone has your heart in their hand squeezing it while twisting a dull knife in your abdomen as their knees press down into your lungs, the kind of pain that you experience during a panic attack or when drowning or, I'd imagine, during an asthma attack, the kind of pain that comes from not being able to breath. Maddyn stumbled home that morning not sure what to do. Every part of her felt on fire and the pain took days to fade enough for her to push it aside and get out of bed, to go back to class, to pretend that everything was normal even though we both knew that the normal of before no longer existed.</p><img src="./Issue1Rose2.gif" alt="Boy in letter jacket with strobe effect"><p>The lights go down as the song ends and the current DJ gets off stage. In a few moments, the lights will come back up as a new DJ starts their set. She moves through the crowd cutting through the people like a boat on water to be closer to that stupid frat boy. He'll notice her when the lights come back up. She knows he will dance with her and reintroduce himself without any effort on her part at all.</p><p>For now, he dances to the interlude music surrounded by his frat buddies. They are doing this hyper-heterosexual dance, all with at least a foot between them even though there is not all that much space in the overcrowded room. Taking up too much space is way better in their minds then the chance that someone would mistake them for being a bit gay or comfortable in their masculinity. Maddyn slips between two boys who are eyeing each other up and down longing too afraid to do any more than that. She stands a few paces in front of her target and starts dancing like she did not even notice him there. He smiles that Jekyll of a smile at her, <em>to not be afraid of strangers</em>, and she does her best to conjure up a smile to return it. <em>I want to puke as he approaches her.</em> He dances with her for a second before he leans down to her ear.</p><p>“Trevor,” he says. Though he screamed, the words could have very easily been lost in the noise of the room if his lips hadn't been so close to hers.</p><p>When he pulls away, she is able to see his face up close for the first time in two weeks. He hasn't changed a bit. She, on the other hand, looks very different. Her naturally auburn hair now an ashy black, and the extravagant makeup that had been a staple in her party going attire nowhere to be seen. <em>There is no way that he would recognize her even if he had bothered to remember her face.</em></p><p>“Rose,” she leans toward him to give the fake name. Another pointless attempt to her identity from a boy who did not care. His smile finds some way to grow. <em>It sends an uneasy feeling through me.</em></p><p>The two dance; his hands rest on her hips making it easier for Maddyn to move him away from his “buddies.” The crowd moves like waves cresting to fill the space behind them. They don't speak, just dance. Maddyn finds a way to keep constant contact with him even when his hands move off her hips. She moves him toward the edge of the sea of people. Every once and awhile, she presses a kiss to his cheek or neck to keep that Cheshire smile on his face. Maddyn knows exactly what she's doing. As another song ends, she leans into him and places a lingering kiss to the corner of his lips, then on his cheek, then by his ear.</p><p>“Wanna go somewhere more private?” her voice seems to float over the music leaving Trevor with no words to say. He nods like a helpless, starving puppy that just saw a steak. She pulls him off the dance floor.</p><p>Maddyn takes a brief second to scan the crowd for Trevor's frat buddies. She spots them exactly where they were when she found them earlier. They don't seem to notice that their friend was missing or maybe they don't care. <em>Stupid boys.</em></p><p>Maddyn links her hand with Trevor's and pulls him in the direction of the bathrooms. The hall lighting is nonexistent. All light coming in comes from the large room they just left or the opening of the bathroom doors. The floor is stickier here. Even in the dim light, Maddyn can see couples who came here in search of somewhere more private, just like she did. <em>I need more privacy for this to work.</em></p><p>With her multitude of Thursday nights spent here, Maddyn knows where to go. She leads Trevor down the hall past the bathrooms to a dingy door that looks like it might pop off its hinges at any moment.</p><p>Trevor is the one to open it. He doesn't show care in any sense of the word as he throws it open and pulls her inside. An outsider might even mistake his actions as if they were saying that it was his idea in the first place. Trevor flicks a switch on the wall and a fluorescent light blinks on revealing the room to them. It can't be larger than four feet by four feet; There are shelves stocked to the ceiling with toiletries. In the corner of the room, there's a mop and bucket that likely haven't been touched since the warehouse was still a place of work.</p><p>Maddyn smiles a genuine smile for the first time that night. The way the corners of her mouth tilt up would be alarming for anyone who looked on her with a sober mind, but three shots and one ecstasy pill in, Trevor does not detect a thing.</p><p>He pushes her up against the shelves opposite the door causing the cleaning supplies to shake. As he moves his mouth to cover hers, she breathes out a cloud of black smoke. Its swift and controlled path makes its way directly into him. He loses his footing and stumbles back disoriented. He cannot find any air to fill his lungs. Black spots dance in his vision' he rubs his eyes trying to dispel them. His back now to the door, he braces himself against as he is unable to stand on his own. His lungs, though he can't see them, have black spots rising on them. <em>If only he could see the damage that I have already caused. They look as if he has been smoking for ten years.</em></p><img src="./Issue1Rose3.gif" alt="Girl in silhouette with darkness coming from her hands"><p>Maddyn stands firm with her feet planted shoulder width apart. It is a familiar stance that she remembers being told in elementary school would make her immovable. She hopes that is true now. Her hands are held off to her sides. From her fingertips pours the same black smoke from earlier, except this time, it comes out thicker than before. It dances across the cleaning closet and into Trevor in any and every possible entrance. It goes in through his nose and mouth and ears. It weasels its way around his eyes causing them to cloud over, turning them pitch black. He lets out a strangled cough trying to expel the smoke to no avail. His eyes start to water, but instead of tears blood comes from his tear ducts.</p><p>Maddyn watches as the smoke decays the frat boy from the inside out. Her eyes cloud as well turning black the same as his. The lights above them start to flicker. When he stops making sounds and moving, she calls the smoke back to her fingers. It recedes from him and her too. His eyes remain their dark black color while hers return to the blue that they were before. His body falls limply to the floor like an abandoned puppet, completely devoid of all life, blocking the door. <em>Shit, that might be a problem.</em></p><p>Maddyn reaches over the body of the once frat boy. She yanks at the door, only able to get it open enough for her to slip out. The door closes behind her with a loud thunk. <em>I am not sure when the next person will find the body or what state it will be in by that time, but I am sure that by then it will have decayed enough to get the door open.</em></p><p>Maddyn stands there in the hall, illuminated by the bathroom light that sneaks its way out from the door that continues to open and close like nothing happened and the distant party lights that still flash on and off in multiple colors.  She leans back against the door and takes a deep breath. A sob escapes her lips only to be swallowed up by thumping music. Tears spill down her cheeks. She makes no attempt to brush them away. If you were to look closely you might see that in certain lighting her tears run black. After a few moments, she gathers herself, wipes away the tears, and walks back into the party.</p><img src="./Issue1Rose4.gif" alt="Girl crying black tears"><p>The members of Alpha Phi Alpha are still where she left them no more than 15 minutes ago. Before she turns away from them, she makes note of the two boys that were eyeing each other up earlier are now heavily making out on the dance floor. It is what Maddyn needs to walk away, leaving Trevor's Body and her guilt behind. <em>Now we can move on to the fun stuff.</em></p>`, "fiction", ["horror"]);
const p103 = new Piece(103, "./issue1art1.html", "Water", "Ade Seegmiller", `<img src="./Water.jpg" alt="Water">`, "art", ["drawing"]);
const pieces = [p101, p103];
pieces.forEach(piece => {
    if (document.getElementById(`p${piece.id}`)) document.getElementById(`p${piece.id}`).innerHTML = piece.content;
});

// search
if (document.getElementById("search")) {
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
                result.innerHTML = `<a href="${piece.url}">${piece.title} by ${piece.author}</a>`;
                if (attribute === "content") {
                    const additionalCharacters = 30;
                    let context = piece.content.replaceAll("><p>", "><p> ");
                    context = context.replace(/(<([^>]+)>)/ig, ''); // https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/#
                    let startIndex = context.indexOf(searchValue) - additionalCharacters;
                    let endIndex = startIndex + searchValue.length + additionalCharacters * 2;
                    context = context.substring(startIndex, endIndex);
                    if (context.includes(" ") && context.includes(context.substring(context.indexOf(" " + 1)))) context = context.substring(context.indexOf(" ") + 1, context.lastIndexOf(" "));
                    result.innerHTML += `: "...${context}..."`;
                }
                return result;
            };

            // adds results
            let addedPieces = [];
            pieces.forEach(piece => {
                if (piece.title.includes(searchValue)) {
                    addedPieces.push(newResult(piece, "title"));
                }
            });
            pieces.forEach(piece => {
                if (piece.author.includes(searchValue) && !addedPieces.includes(newResult(piece, "title"))) {
                    addedPieces.push(newResult(piece, "author"));
                }
            });
            pieces.forEach(piece => {
                if (piece.genre.includes(searchValue) && !addedPieces.includes(newResult(piece, "title")) && !addedPieces.includes(newResult(piece, "author"))) {
                    addedPieces.push(newResult(piece, "genre"));
                }
            });
            pieces.forEach(piece => {
                if (piece.tags.includes(searchValue) && !addedPieces.includes(newResult(piece, "title")) && !addedPieces.includes(newResult(piece, "author")) && !addedPieces.includes(newResult(piece, "genre"))) {
                    addedPieces.push(newResult(piece, "tags"));
                }
            });
            pieces.forEach(piece => {
                if (piece.content.includes(searchValue) && !addedPieces.includes(newResult(piece, "title")) && !addedPieces.includes(newResult(piece, "author")) && !addedPieces.includes(newResult(piece, "genre")) && !addedPieces.includes(newResult(piece, "tags"))) {
                    addedPieces.push(newResult(piece, "content"));
                }
            });
            addedPieces.forEach(addedResult => {
                results.appendChild(addedResult);
            });

            // no results
            if (!document.getElementById("results").innerHTML) {
                document.getElementById("results").innerHTML = "<li class=\"result\">No Results</li>";
            }

            // clear search bar
            document.getElementById("search").value = "";
        }
    };

    // searches on submit or enter
    document.getElementById("searchButton").onclick = search;
    document.getElementById("search").addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });
}