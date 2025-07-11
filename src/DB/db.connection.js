import { Sequelize } from "sequelize";

//sequlize object only mesh d2a el connect ya3ni
export const sequelize_config=new Sequelize ('sequalizeproject','root','Bibabiba2004@',{

    host:"localhost",
    dialect:"mysql" // ely tekteb fi el type
});

console.log("5");
export  const dbconnection =async ()=>{

    try{
        console.log("4");
      // await sequelize_config.test(); // for test connection only but sync open a vhannel between the srream and the code
        await sequelize_config.sync({alter:true,force:true});  // te5aly ay ta8ayor yehsal 
console.log("eshtaaa");
    }
    catch(err)
    {
        console.log("error");
    }
}

//hane3ml call le di 3and el enidex

