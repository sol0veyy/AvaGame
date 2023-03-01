const themeButton = document.querySelector('.theme i')
const clear = document.querySelector('.clear')
const body = document.querySelector('body')
const search = document.querySelector('.search')
const icon = document.getElementById('icon')
const searchInput = document.querySelector('.search .input input')
const logo = document.querySelector('.logo')

themeButton.onclick = () => {
    themeButton.classList.toggle('fa-toggle-on')
    body.classList.toggle('bodyStyle')
    search.classList.toggle('searchStyle')
    icon.classList.toggle('iconStyle')
    icon.classList.toggle('icon')
    searchInput.classList.toggle('searchInputStyle')
    logo.classList.toggle('svgStyle')
}

clear.onclick = () => {
    document.getElementById('mySearch').value = '';
}