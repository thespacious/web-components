/**
 * @class {PictureGrid} : Provides a component which will create a grid of linkable pictures which stretch across the screen 
 * in desktop and tablet views, but are stacked 1 wide in mobile views
 * 
 */
class PictureGrid extends HTMLElement {
    /**
     * @property {PictureGrid._width} : The number of tiles to create for each row in desktop and tablet views 
     * @property {PictureGrid._url} : the url of the folder containing the images to be used for the grid elements, 
     * defaults to online open license gallery 
     * @property {PictureGrid._nodes}: holds text content of child elements of a picture-grid element 
     */
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._width = 3;
        this._url = '../assests/grid-pictures';
        this._nodes = '';

    }

    static get observedAttributes() {return ['nodes'];}

    attributeChangedCallback(name, oldVal, newVal){
        var template = `
        <div> nodes: ${this._nodes}</div>
        `;

        this.shadow.innerHTML = template;
    }

    get nodeValue() {
        return this.hasAttribute(_nodes);
    }


    /**
     * @function connectedCallback() : called when custom element is inserted into the dom (or shadow dom)
     * used to grab text values of child elements, because these elements will not exist when the contructor
     * is fired
     */
    connectedCallback(){
        // this._nodes = JSON.stringify(this.children);
        this._nodes = Object.keys(this.children).map(child => {
            return this.children[child].textContent;
        });
        var template = `
            <div> nodes: ${this._nodes}</div>
        `;

        this.shadow.innerHTML = template;
    }

    get getChildrenText(){
        this._nodes = Object.keys(this.children).map(child => {
            return this.children[child].textContent;
        });
    }

    
}

window.customElements.define('picture-grid', PictureGrid);

