
        
    
        function hideIframes() {
            let audioElements = document.querySelectorAll('.audio');
            for (let i = 0; i < audioElements.length; i++) {
                audioElements[i].children[0].style.display = "block";
                try {
                    audioElements[i].querySelector('iframe').remove();
                } catch (error) {}
            }
        }

        window.addEventListener('beforeunload', function () {
            localStorage.setItem('Music_storage', document.body.innerHTML);
        });

        window.addEventListener('load', function () {
            if (localStorage.getItem('Music_storage')) {
                document.body.innerHTML = localStorage.getItem('Music_storage');
                hideIframes();
            }
        });

        function allDeafults() {
            for (let i = 0; i < document.getElementsByClassName("delete").length; i++) {
                document.getElementsByClassName("delete")[i].style.backgroundColor = "red";
            }
        }

        function getPreviousSibling(element) {
            let sibling = element.previousSibling;

            if (!sibling) {
                return null;
            }

            while (sibling) {
                if (sibling.nodeType !== Node.TEXT_NODE) {
                    return sibling;
                }
                sibling = sibling.previousSibling;
            }

            return null;
        }

        function getYoutubeVideoId(url) {
            var youtubePattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
            var match = url.match(youtubePattern);

            if (match && match[1]) {
                return match[1];
            } else {
                return '';
            }
        }

        function returnHexColor(hexCode) {
            hexCode = hexCode.replace('#', '');

            let r = parseInt(hexCode.substring(0, 2), 16);
            let g = parseInt(hexCode.substring(2, 4), 16);
            let b = parseInt(hexCode.substring(4, 6), 16);

            let brightness = (r * 299 + g * 587 + b * 114) / 1000;

            if (brightness >= 128) {
                return true;
            } else {
                return false;
            }
        }

        function colorLighter(hexCode) {
            let hex = hexCode.replace('#', '');

            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);

            let pojasnionyR = Math.min(Math.round(r * 1.2), 255);
            let pojasnionyG = Math.min(Math.round(g * 1.2), 255);
            let pojasnionyB = Math.min(Math.round(b * 1.2), 255);

            let pojasnionyHex = `#${pojasnionyR.toString(16).padStart(2, '0')}${pojasnionyG.toString(16).padStart(2, '0')}${pojasnionyB.toString(16).padStart(2, '0')}`;

            return pojasnionyHex;
        }

        function rgbToHex(rgb) {
            // Pobieranie wartości R, G i B
            const values = rgb.match(/\d+/g);
            const r = parseInt(values[0]);
            const g = parseInt(values[1]);
            const b = parseInt(values[2]);

            // Konwersja wartości R, G i B na kod HEX
            const hex = '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');

            return hex;
        }

        function upArrowFunc(that) {
            let element = that.parentNode.parentNode.parentNode;

            if (element != document.querySelectorAll('.music_element')[0]) {
                element.parentNode.insertBefore(element, getPreviousSibling(element));
            }
        }

        function downArrowFunc(that) {
            let element = that.parentNode.parentNode.parentNode;

            if (element.nextElementSibling.nextElementSibling != null && element.nextElementSibling != null) {
                element.parentNode.insertBefore(element, element.nextElementSibling.nextElementSibling);
            }
        }

        function deleteFunc(element) {
            try {
                for (let i = 0; i < document.getElementsByClassName('delete_info').length; i++) {
                    document.getElementsByClassName('delete_info')[i].remove()
                }
            } catch (error) {
                console.log(error)
            }

            let deleteString = `
                <div class="delete_info">
                    <div class="random8">
                        Usunięto: 
                    </div>
                    <div class="random9">
                        <div class="random10">
                            ${element.parentNode.parentNode.parentNode.children[2].children[0].innerHTML.trim() + ":"}
                        </div>
                        <div class="random11">
                            ${element.parentNode.parentNode.parentNode.children[2].children[1].innerHTML.trim()}
                        </div>
                    </div>
                </div>
            `

            document.body.insertAdjacentHTML('beforeend', deleteString)

            setTimeout(function () {
                for (let i = 0; i < document.getElementsByClassName('delete_info').length; i++) {
                    document.getElementsByClassName('delete_info')[i].remove()
                }
            }, 6000)

            element.parentNode.parentNode.parentNode.remove();
        }

        function deletePlaylistFunc(element) {
            let popUp = `
                <div class="popUp">
                    <div class="rand2">
                        Are you sure?
                    </div>
                    <div class="rand3">
                        <input type="button" class="popUpYES popUpButton" value="YES" onclick="yesPopUp()">
                        <input type="button" class="popUpNO popUpButton" value="NO" onclick="noPopUp(this)">
                    </div>
                </div>`;

            if (document.querySelector('.popUp')) {
                document.querySelector('.popUp').remove();
            }
            element.parentNode.insertAdjacentHTML('beforeend', popUp);

            element.parentNode.parentNode.parentNode.parentNode.classList.add("removeElement");

        }

        function hidePlaylist(element) {
            if (element.parentNode.nextElementSibling.style.display != "none") {
                element.parentNode.nextElementSibling.style.display = "none";
                element.src = "images/arrowUp.png";
            } else {
                element.parentNode.nextElementSibling.style.display = "block";
                element.src = "images/arrowDown.png";
            }
        }

        function deleteChange(button) {
            button.style.backgroundColor = "darkred";
        }

        function createAudioIframe(element) {

            let Audio = `
                <iframe src="https://www.youtube.com/embed/${getYoutubeVideoId(element.parentNode.nextElementSibling.children[1].innerHTML)}" allowfullscreen frameborder="0" class="iframe_el"></iframe>
            `;
            element.insertAdjacentHTML('afterend', Audio);

            element.style.display = "none";
            element.parentNode.children[1].style.display = "flex";
        }

        function addAudio(element) {
            if (element.parentNode.children[2].value.trim() != "" && element.nextElementSibling.value != "") {
                actionElement = element;

                let newAudio = `<div class="music_element">
                    <div class="spamer1"></div>
                    <div class="audio">
                        <input type="button" value="Load" class="get_audio_iframe" onclick="createAudioIframe(this)">
                    </div>
                    <div class="random6">
                        <div class="audio_title">
                            ${element.parentNode.children[2].value}
                        </div>
                        <a href="${element.nextElementSibling.value}" class="link">
                            ${element.nextElementSibling.value}
                        </a>
                    </div>
                    <div class="buttons_div">
                        <div class="_1_buttons_div">
                            <div type="button" class="delete" onmousedown="deleteChange(this)" onclick="deleteFunc(this)">X</div>
                        </div>
                        <div class="_2_buttons_div">
                            <img src="images/arrowUp2.png" class="upArrow arrow" onclick="upArrowFunc(this)">
                            <img src="images/arrowDown2.png" class="downArrow arrow" onclick="downArrowFunc(this)">
                        </div>
                    </div>
                </div>`;

                element.parentNode.nextElementSibling.insertAdjacentHTML('afterbegin', newAudio);

                element.nextElementSibling.value = "";

                let RGB = window.getComputedStyle(element.parentNode.parentNode.parentNode.children[0].children[0]).color;
                RGB = rgbToHex(RGB)

                element.parentNode.parentNode.children[1].children[0].children[2].children[0].style.color = RGB;
                element.parentNode.children[2].value = "";
                createAudioIframe(element.parentNode.parentNode.children[1].children[0].children[1].children[0])
            } else if (element.parentNode.children[2].value.trim() == "" && element.nextElementSibling.value == "") {
                element.parentNode.children[2].style.border = "red solid 2px";
                element.nextElementSibling.style.border = "red solid 2px";
                setTimeout(function () {
                    element.parentNode.children[2].style.border = "black solid 2px";
                    element.nextElementSibling.style.border = "black solid 2px";
                }, 1500)
            } else if (element.parentNode.children[2].value.trim() == "") {
                element.parentNode.children[2].style.border = "red solid 2px";
                setTimeout(function () {
                    element.parentNode.children[2].style.border = "black solid 2px";
                }, 1500)
            } else if (element.nextElementSibling.value == "") {
                element.nextElementSibling.style.border = "red solid 2px";
                setTimeout(function () {
                    element.nextElementSibling.style.border = "black solid 2px";
                }, 1500)
            }

        }

        function yesPopUp() {
            document.querySelector('.popUp').remove();
            document.querySelector(".removeElement").remove();
        }

        function noPopUp(element) {
            document.querySelector('.popUp').remove();
            document.querySelector(".removeElement").classList.remove("removeElement")
        }

        function playlistEditPopUp(element) {
            let BGcolor = window.getComputedStyle(element.parentNode.parentNode.parentNode.parentNode.children[0].children[0]).backgroundColor;
            BGcolor = rgbToHex(BGcolor);

            let test = element.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].innerHTML;

            let popUp = `<div class="edit_popUp">
                <div class="random4">
                    <input type="text" class="newPlaylistName" placeholder="New Name" value="${test}">
                    <input type="color" class="color_input" value="${BGcolor}">
                </div>
                <div class="random5">
                    <input type="button" class="deny_playlist" value="X" onclick="noEditPopUp()">
                    <input type="button" class="apply_playlist" value="✓" onclick="yesEditPopUp(this)">
                </div>
            </div>`;

            if (document.querySelector('.edit_popUp')) {
                document.querySelector('.edit_popUp').remove();
            }

            element.parentNode.insertAdjacentHTML('beforeend', popUp);
        }

        function noEditPopUp() {
            document.querySelector('.edit_popUp').remove();
        }

        function yesEditPopUp(element) {

            let colorInput = element.parentNode.parentNode.children[0].children[1];

            element.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.backgroundColor = colorInput.value;
            if (element.parentNode.parentNode.children[0].children[0].value.trim() != "") {
                element.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].innerHTML = element.parentNode.parentNode.children[0].children[0].value;
            }

            if (returnHexColor(colorInput.value)) {
                element.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.color = "black";

                for (let i = 1; i < element.parentNode.parentNode.parentNode.parentNode.children[1].childElementCount; i++) {
                    element.parentNode.parentNode.parentNode.parentNode.children[1].children[i - 1].children[2].children[0].style.color = "black"
                }
            } else {
                element.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.color = "white";

                for (let i = 1; i < element.parentNode.parentNode.parentNode.parentNode.children[1].childElementCount; i++) {
                    element.parentNode.parentNode.parentNode.parentNode.children[1].children[i - 1].children[2].children[0].style.color = "white"
                }
            }

            element.parentNode.parentNode.parentNode.parentNode.children[0].style.backgroundColor = colorLighter(colorInput.value);
            element.parentNode.parentNode.parentNode.parentNode.children[1].style.backgroundColor = colorLighter(colorLighter(colorInput.value));

            document.querySelector('.edit_popUp').remove();
        }

        function upPlaylistArrow(that) {
            let element = that.parentNode.parentNode.parentNode.parentNode.parentNode;
            hideIframes()

            console.log(document.querySelectorAll('.playlist_element')[0])

            if (element != document.querySelectorAll('.playlist_element')[0]) {
                element.parentNode.insertBefore(element, getPreviousSibling(element));
            }
        }

        function downPlaylistArrow(that) {
            let element = that.parentNode.parentNode.parentNode.parentNode.parentNode;
            hideIframes()

            console.log(element.nextElementSibling.id);

            if (element.nextElementSibling.id != "testing2" && element.nextElementSibling != null) {
                element.parentNode.insertBefore(element, element.nextElementSibling.nextElementSibling);
            }
        }

        function addNewPlaylist() {
            if (playlist_name.value.trim() != "") {

                let playlistString = `<div class="playlist_element">
                    <div class="playlist_div">
                        <div class="playlist_header">
                            <p class="playlist_name">${playlist_name.value}</p>
                            <img src="images/arrowDown.png" class="hide" onclick="hidePlaylist(this)">
                        </div>
                        <div class="playlist_rest">
                            <div class="add_div">
                                <input type="button" class="add_btn" value="+" onclick="addAudio(this)">
                                <input type="text" class="youtube_url" placeholder="YT URL">
                                <input type="text" class="audio_newElement_name" placeholder="Music Name">
                                <img src="images/edit.png" alt="EDIT" class="edit_playlist" onclick="playlistEditPopUp(this)">
                                <div class="random7">
                                    <img src="images/arrowUp2.png" alt="arrowUp" class="playlistArrow playlistArrowUp" onclick="upPlaylistArrow(this)">
                                    <img src="images/arrowDown2.png" alt="arrowDown" class="playlistArrow playlistArrowDown" onclick="downPlaylistArrow(this)">
                                </div>
                                <div type="button" class="delete" onclick="deletePlaylistFunc(this)" onmousedown="deleteChange(this)">X</div>
                            </div>
                            <div class="music_elements">
                                <div class="testing"></div>
                            </div>
                        </div>
                    </div>
                </div>`;

                testing2.insertAdjacentHTML('beforeBegin', playlistString)

                playlist_name.value = "";

                let lastPlaylistElement = document.querySelectorAll('.playlist_element')[document.querySelectorAll('.playlist_element').length - 1];

                lastPlaylistElement.children[0].children[0].style.backgroundColor = add_color1.value
                if (returnHexColor(add_color1.value)) {
                    lastPlaylistElement.children[0].children[0].style.color = "black";
                } else {
                    lastPlaylistElement.children[0].children[0].style.color = "white";
                }

                lastPlaylistElement.children[0].children[1].children[0].style.backgroundColor = colorLighter(add_color1.value);
                lastPlaylistElement.children[0].children[1].children[1].style.backgroundColor = colorLighter(colorLighter(add_color1.value));

                add_color1.value = "#FF7417";
            } else {
                playlist_name.style.border = "red solid 2px";
                setTimeout(function () {
                    playlist_name.style.border = "none";
                }, 1500)
            }
        }


    