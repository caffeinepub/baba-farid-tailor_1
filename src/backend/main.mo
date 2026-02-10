import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Measurement = {
    chest : Float;
    waist : Float;
    shoulder : Float;
    length : Float;
    hipCircumference : Float;
    inseam : Float;
    thighCircumference : Float;
    frontRise : Float;
    backRise : Float;
    cuffCircumference : Float;
    sleeveLength : Float;
    bicepCircumference : Float;
  };

  type Category = {
    id : Nat;
    name : Text;
    description : Text;
    popularStyles : ?[Nat];
  };

  type Style = {
    id : Nat;
    name : Text;
    description : Text;
    categoryId : Nat;
    price : Float;
    image : Text;
  };

  type Order = {
    id : Nat;
    customerName : Text;
    contactInfo : Text;
    category : Nat;
    style : Nat;
    measurement : Measurement;
    orderStatus : Text;
    price : Float;
    orderDate : Time.Time;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    contact : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type CatalogResponse = {
    categories : [Category];
    styles : [Style];
  };

  module OrderModule {
    public func compareByDateDesc(a : Order, b : Order) : Order.Order {
      if (a.orderDate < b.orderDate) { #greater } else if (a.orderDate > b.orderDate) { #less } else {
        #equal;
      };
    };
  };

  let categories = List.fromArray<Category>([
    {
      id = 1;
      name = "Suits";
      description = "Custom-tailored suits for every occasion.";
      popularStyles = ?[1, 2, 3];
    },
    {
      id = 2;
      name = "Shirts";
      description = "Perfectly fitted shirts, tailored just for you.";
      popularStyles = ?[4, 5, 6];
    },
    {
      id = 3;
      name = "Pants";
      description = "Pants designed to your exact specifications.";
      popularStyles = ?[7, 8, 9];
    },
    {
      id = 4;
      name = "Traditional Wear";
      description = "Authentic traditional clothing for all occasions.";
      popularStyles = ?[10, 11, 12];
    },
  ]);

  let styles = List.fromArray<Style>([
    {
      id = 1;
      name = "Classic Two-Piece Suit";
      description = "A timeless suit jacket and pants combination.";
      categoryId = 1;
      price = 250.00;
      image = "classic_suit.jpg";
    },
    {
      id = 2;
      name = "Three-Piece Suit";
      description = "Suit with a vest, jacket, pants, and shirt.";
      categoryId = 1;
      price = 300.00;
      image = "three_piece.jpg";
    },
    {
      id = 3;
      name = "Business Casual Suit";
      description = "Smart, tailored look for work and travel.";
      categoryId = 1;
      price = 180.00;
      image = "business_casual.jpg";
    },
    {
      id = 4;
      name = "Formal Shirt";
      description = "Classic dress shirt for formal occasions.";
      categoryId = 2;
      price = 50.00;
      image = "formal_shirt.jpg";
    },
    {
      id = 5;
      name = "Casual Shirt";
      description = "Comfortable shirt for daily wear.";
      categoryId = 2;
      price = 35.00;
      image = "casual_shirt.jpg";
    },
    {
      id = 6;
      name = "Dress Pants";
      description = "Tailored pants for a refined look.";
      categoryId = 3;
      price = 70.00;
      image = "dress_pants.jpg";
    },
    {
      id = 7;
      name = "Jeans";
      description = "Custom-fit denim pants.";
      categoryId = 3;
      price = 60.00;
      image = "jeans.jpg";
    },
    {
      id = 8;
      name = "Slacks";
      description = "Comfortable and stylish slacks.";
      categoryId = 3;
      price = 65.00;
      image = "slacks.jpg";
    },
    {
      id = 9;
      name = "Saree Blouse";
      description = "Traditional Indian blouse for saree wear.";
      categoryId = 4;
      price = 40.00;
      image = "saree_blouse.jpg";
    },
    {
      id = 10;
      name = "African Kaftan";
      description = "African-inspired kaftan dress.";
      categoryId = 4;
      price = 80.00;
      image = "kaftan.jpg";
    },
    {
      id = 11;
      name = "Sherwani";
      description = "Indian traditional suit for weddings and celebrations.";
      categoryId = 4;
      price = 150.00;
      image = "sherwani.jpg";
    },
  ]);

  let orderQueue = List.empty<Order>();
  let inquiries = List.empty<Inquiry>();
  var nextOrderId = 1;
  var nextInquiryId = 1;

  public query ({ caller }) func getCatalog() : async CatalogResponse {
    {
      categories = categories.toArray();
      styles = styles.toArray();
    };
  };

  public shared ({ caller }) func submitOrder(
    customerName : Text,
    contactInfo : Text,
    categoryId : Nat,
    styleId : Nat,
    measurement : Measurement,
  ) : async Order {
    let validatedCategories = categories.toArray();
    switch (validatedCategories.filter(func(cat) { cat.id == categoryId }).values().next()) {
      case (null) { return orderFailure("Invalid category selection") };
      case (_) {};
    };

    let validatedStyles = styles.toArray();
    let selectedStyle = validatedStyles.filter(func(style) { style.id == styleId });
    switch (selectedStyle.values().next()) {
      case (null) { return orderFailure("Invalid style selection") };
      case (_) {};
    };

    let newOrder = {
      id = nextOrderId;
      customerName;
      contactInfo;
      category = categoryId;
      style = styleId;
      measurement;
      orderStatus = "Pending";
      price = switch (selectedStyle.values().next()) { case (null) { 0.0 }; case (?style) { style.price } };
      orderDate = Time.now();
    };

    orderQueue.add(newOrder);
    nextOrderId += 1;
    newOrder;
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    contact : Text,
    message : Text,
  ) : async Bool {
    if (message.size() == 0 or name.size() == 0) {
      return false;
    };

    let newInquiry = {
      id = nextInquiryId;
      name;
      contact;
      message;
      timestamp = Time.now();
    };

    inquiries.add(newInquiry);
    nextInquiryId += 1;
    true;
  };

  func orderFailure(_ : Text) : Order {
    {
      id = 0;
      customerName = "Failed";
      contactInfo = "";
      category = 0;
      style = 0;
      measurement = {
        chest = 0.0;
        waist = 0.0;
        shoulder = 0.0;
        length = 0.0;
        hipCircumference = 0.0;
        inseam = 0.0;
        thighCircumference = 0.0;
        frontRise = 0.0;
        backRise = 0.0;
        cuffCircumference = 0.0;
        sleeveLength = 0.0;
        bicepCircumference = 0.0;
      };
      orderStatus = "Failed";
      price = 0.0;
      orderDate = 0;
    };
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orderQueue.toArray().sort(OrderModule.compareByDateDesc);
  };
};
