describe('<%= name %>Service', function () {

  beforeEach(module('<%= module %>'));

  it('exists', inject(function (_<%= name %>Service_) {
    expect(_<%= name %>Service_).toBeDefined();
  }));

  it('should result 10 the sum of 7 + 3', inject(function('<%= name %>') {
    expect('<%= name %>'.plus(7, 3)).toEqual(10);
  }));
});
