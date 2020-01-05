describe('Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Riku',
      username: 'rikuho',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in')
        .click()
      cy.get('#username')
        .type('rikuho')
      cy.get('#password')
        .type('salainen')
      cy.contains('Login')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Riku logged in')
    })

    it('new blog can be created', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Harrys life')
      cy.get('#author')
        .type('J.K. Rowling')
      cy.get('#url')
        .type('harripotteri.com')
      cy.contains('create')
        .click()
      cy.contains('Harrys life')
    })

    it('users and their blog count can be viewed', function () {
      cy.contains('Users')
        .click()
      cy.contains('User list')
    })

    it('user can logout', function () {
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })
    describe.only('when one blog in db', function () {
      beforeEach(function () {
        cy.contains('new blog')
          .click()
        cy.get('#title')
          .type('Harrys life')
        cy.get('#author')
          .type('J.K. Rowling')
        cy.get('#url')
          .type('harripotteri.com')
        cy.contains('create')
          .click()
      })

      it('blog name is link', function () {
        cy.contains('Harrys life')
          .click()
        cy.contains('Harrys life by J.K. Rowling')
      })

      it('blog can be liked', function () {
        cy.contains('Harrys life')
          .click()
        cy.contains('like')
          .click()
        cy.contains('1 likes')
      })

      it('blog can be commented', function () {
        cy.contains('Harrys life')
          .click()
        cy.get('#comment')
          .type('Testi kommentti')
        cy.contains('add comment')
          .click()
        cy.contains('Testi kommentti')
      })

    })
  })
})