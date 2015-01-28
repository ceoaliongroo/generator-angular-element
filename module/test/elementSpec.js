describe('<%= name %>', function () {

  beforeEach(module('<%= module %>'));

  it('exists', inject(function ($templateFactory) {
    expect($templateFactory).toBeDefined();
  }));

  it('should result 10 the sum of 7 + 3', inject(function('<%= name %>') {
    expect('<%= name %>'.plus(7, 3)).toEqual(10);
  }));
});
