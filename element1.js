class Element1 extends HTMLElement {
    constructor() {
        // Super calls the parent class' (HTMLElement) contructor, and must be called before the this keyword can be used
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this._attr = '0';
    }  

    //a list of attributes for the DOM to watch, each time one changes the attributeChangedCallback function will be called
    static get observedAttributes() {return ['attr'];}

    /** when observed attribute changes this function is called, if you need to update or perform a function on value changed do it here 
     * @param name: name of the attribute to be changed
     * @param oldValue: value of attribute before it is changed
     * @param newValue: value of the attribute after it is changed
    */
    attributeChangedCallback(name, oldValue, newValue){
        let innerBar = this.shadow.querySelector('.inner');

        switch(name){
            case 'attr':
            this._attr = parseInt(newValue, 10) || 0;

            innerBar.style.width = this._attr + '%';
            innerBar.innerHTML = this._attr + '%';
         }
    }

    get attrValue() {
        return this._attr;
    }

    set attrValue(val) {
        //can we simply assign the var (this._attr = val;)? No there are background functions that happen in setAttribute funciton
   
        this.setAttribute('_attr', val);
    }

    connectedCallback(){
        var template = `
            <style>
                .outer {
                    width: 50%;
                    height: 30px;
                    background-color:grey;
                    color: white
                }
                
                .inner{
                    height:100%;
                    line-height: 30px;
                    text-align: center;
                    transition: width: 0.25s;
                    background-color: green;
                }
            </style>
            <div class="outer">
                <div class="inner">${this._attr}%</div>
            </div>
        `;

        this.shadow.innerHTML = template;
    }

}

window.customElements.define('element-1', Element1);