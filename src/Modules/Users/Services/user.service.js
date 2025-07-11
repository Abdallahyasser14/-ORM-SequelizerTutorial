

/** insert(create) methods 
 * 
 *create   // one user
 * findorcretae  // u put a condition if found a user so ok if not so create
 * bulkcraete   // aray of users ya3ni kaza wahed mara whada
 */

/** find methods   ahsan nesta5dmohom law 3ayazin net2aked men condition abl el create
 * 3shan el complexity
 * 
 * 
findALL   returns kaza row
findone    ye5rog men awl match 3la tool    .. returns object or null if didnt exist
findBypk   law m3ak el primary key

 */


import User from "../../../DB/Models/user.model.js";

export const SignupService =async (req,res)=>{
try 
{

    // benfaakar 3awzin data eh 

    const {first_name,last_name,email,password,age,gender} =req.body
 const user=await User.create({
    first_name,last_name,email,password,age,gender
 })
   return res.status(200).json({

        message:"user created successfully",
        user
    })

}

catch (err)
{
    console.log(err);
    return res.status(500).json({

        message:err.message
    })

}


}


/* to update row

update 
save
-------------- ely fo2 dol el main ya3ni 7ata law est5dmt ely taht lazem ely fo2
increment  
decrement


*/

export const UpdateServiceasync =async (req,res)=>{
try 
{

    const {first_name,last_name,email,password,age,gender} =req.body

    const {userID}=req.params;
    // d2a el id ely ha3mlo update 

const updateddata={}

if (first_name)
    updateddata.first_name=first_name;
if (last_name)
    updateddata.last_name=last_name;
if (email)
   { 
     const isemailexist=await User.findOne({
        where:{email}
     })


    if (isemailexist)
    {   return res.status(500).json({

        message:"email already exist",
      
    })

    }
    updateddata.email=email;



   }
if (password)
    updateddata.password=password;
if (age)
    updateddata.age=age;
if (gender)
    updateddata.gender=gender;

 const isupdate=await User.update(updateddata,

{
    where:{id:userID}
})
 // awel object hate3ml update for what tany object el condition
   return res.status(200).json({

        message:"user created successfully",
        isupdate
    })

}

catch (err)
{
    console.log(err);
    return res.status(500).json({

        message:err.message
    })

}


}




/**  delete
 * 
 * destroy
 * truncate
 * 
 */






/**  find
 * 
 * findall     teraga3 kolo
 * findone     conditions yeraga3 row wahed
 * findbypk       id
 * 
 */




export const ListUsers=async (req,res)=>{
try 
{



//     const {first_name,last_name,email,password,age,gender} =req.body
//  const user=await User.create({
//     first_name,last_name,email,password,age,gender
//  })


    const users =await User.findAll({

        where :{ 

        }}
    )     // hatrag3 kol haga 3la too;
       return res.status(200).json({

        message:"users retrieved successfully",
        users
    })
}

catch (err)
{
    console.log(err);
    return res.status(500).json({

        message:err.message
    })

}


}