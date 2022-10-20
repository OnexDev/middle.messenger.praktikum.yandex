import Block from "../../utils/Block";
import Button from "../../components/button";
import Router from "../../utils/Router";
import {Routes} from "../../index";
import styles from './errorPage.scss'
import template from "./errorPage.hbs";
import store from "../../utils/Store";
import getPropsWithAugmentedClasses from "../../utils/atomic/getPropsWithAugmentedClasses";

enum ErrorCodes {
    NOT_FOUND = '404',
    SMTH_WENT_WRONG = '5xx'
}

export default class errorPage extends Block {
    constructor() {
        super(getPropsWithAugmentedClasses({}, [styles.page], []));
    }

    init() {
        this.props.code = (document.location.pathname).replace('/', '');
        if(this.props.code === ErrorCodes.NOT_FOUND){
            this.props.description = "Не туда попали"
        } else {
            this.props.description = "Что-то сломалось, мы уже фиксим."
        }
        let isAuthorized: boolean = false;
        if(store.getState().user){
            isAuthorized = true;
        }
        this.children.returnButton = new Button({
            label: isAuthorized ? 'Вернуться к чатам' : 'Вернуться на главную',
            attrs:{
                class: styles.button,
            },
            events: {
                click: () => {
                    isAuthorized ? Router.go(Routes.MESSENGER) : Router.go(Routes.INDEX)
                }
            }
        })
    }
    render() {
        return this.compile(template, {...this.props, styles});
    }
}

