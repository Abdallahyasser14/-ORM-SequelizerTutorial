import { sequelize_config } from "../db.connection.js";
import { DataTypes, Model } from "sequelize";
import User from "./user.model.js";

// EL TARE2A EL TANYA EL EXTEND
class Blog extends Model 
{
    // ( ممكن نسيبه فاضي لو مافيش methods دلوقتي )
}

// beta5od 2 objects el attributes we el option
Blog.init(
    {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },

   fkUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},  // hena el attributes elly fe el table, hansebo fady delwa2ty

    {  
        // hena fel options haga zeyada ben3arafo howa tab3 anhy database
        // we esm el model
        sequelize: sequelize_config,
        modelName: "Blog"
    }
);

// hne3ml export lel class
export default Blog;


// one user has many blogs
Blog.belongsTo(User,{

  foreignKey:{
    name:"fkUserId"
  },
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  as:'user_data'
})
// one blog belongs to une user
// 
User.hasMany(Blog,{

  foreignKey:{
    name:"fkUserId"
  },
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  as:'user_data'
})


// law many to many lazem te3ml table talet