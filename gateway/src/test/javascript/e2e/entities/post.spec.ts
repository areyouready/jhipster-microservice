import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Post e2e test', () => {

    let navBarPage: NavBarPage;
    let postDialogPage: PostDialogPage;
    let postComponentsPage: PostComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Posts', () => {
        navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(postComponentsPage.getTitle())
            .toMatch(/Posts/);

    });

    it('should load create Post dialog', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage = new PostDialogPage();
        expect(postDialogPage.getModalTitle())
            .toMatch(/Create or edit a Post/);
        postDialogPage.close();
    });

    it('should create and save Posts', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage.setTitleInput('title');
        expect(postDialogPage.getTitleInput()).toMatch('title');
        postDialogPage.setBodyInput('body');
        expect(postDialogPage.getBodyInput()).toMatch('body');
        postDialogPage.setAuthorInput('author');
        expect(postDialogPage.getAuthorInput()).toMatch('author');
        postDialogPage.save();
        expect(postDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PostComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-post div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PostDialogPage {
    modalTitle = element(by.css('h4#myPostLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    bodyInput = element(by.css('textarea#field_body'));
    authorInput = element(by.css('input#field_author'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setBodyInput = function(body) {
        this.bodyInput.sendKeys(body);
    };

    getBodyInput = function() {
        return this.bodyInput.getAttribute('value');
    };

    setAuthorInput = function(author) {
        this.authorInput.sendKeys(author);
    };

    getAuthorInput = function() {
        return this.authorInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
