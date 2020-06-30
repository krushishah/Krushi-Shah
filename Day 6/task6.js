//Class Bike is a parent class which gives the brand name of bike 
class Bike {
    constructor(brand) {
      this.bikename = brand;
    }
    present() {
      return 'I have a ' + this.bikename;
    }
  }
  //class model is a child class of Bike and it provides the model of the Bike
  class Model extends Bike {
    constructor(brand, mod) {
      super(brand);
      this.model = mod;
    }
    show() {
      return this.present() + ', it is a ' + this.model;
    }
  }
//class Price is a inherits the properties of Bike class and provides price of bike 
  class Price extends Bike{
      constructor(brand,price){
          super(brand);
          this.Bprice = price;
      }
      show(){
          return this.present() + ',it\'s price is  '+this.Bprice ;
      }
  }

  
    mybikemodel = new Model("KTM", "DUKE");
    mybikeprice = new Price("KAWASAKI","200000");
    document.getElementById("l1").innerHTML = mybikemodel.show();
    document.getElementById("l2").innerHTML = mybikeprice.show();
