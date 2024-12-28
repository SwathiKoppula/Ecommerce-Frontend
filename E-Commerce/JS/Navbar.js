function navbar(){

    return`
    <div class="navbarpage">
    <div>
    <h3 id="userName">EXCLUSIVE</h3>
    </div>
    <ul class="links">
    <li><a href="../HTML/Home.html" target="_blank">Home</a></li>
    <li><a href="../HTML/About.html" target="_blank">About</a></li>
    <li><a href="#" id="logout">Log Out</a></li>
    </ul>
    <div class="nav_items">
    <form class="nav_form">
    <input type="search" name="search" placeholder="search" class="nav_input"/>
    <img src="" class="nav_search"/>
    </form>
    <div>
     <a href="#" id="cartCheckLogin"><img src="" alt="cart" class="icon"/></a>
    </div>
    </div>
    </div>`
}

export default navbar;