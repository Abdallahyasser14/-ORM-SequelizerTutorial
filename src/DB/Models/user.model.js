// تعريف جدول المستخدمين بالطريقة الأولى باستخدام define

import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

// el database hategma3o
// هنا بننشئ الموديل (User) اللي هيمثل جدول المستخدمين
const User = sequelize_config.define("User",  // اسم الموديل، Sequelize هيعمله plural تلقائي => Users

{  // ----- الأعمدة (Attributes) الخاصة بالجدول -----
  
  first_name: {
    type: DataTypes.STRING(30),    // نوع البيانات: نص بطول 30 حرف كحد أقصى
    allowNull: false,              // لا يسمح يكون فاضي (NULL)
    validate: {                    // التحقق من القيم المُدخلة
      len: [2, 30],                // لازم يكون بين 2 و30 حرف
      notEmpty: true               // ماينفعش يكون string فاضي ""
    }
  },

  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: [2, 30],
      notEmpty: true
    }
  },

  // d2a ana 3ayez ahsebo bs mesh 3ayez a5azeno fel database 
  // ya3ni m3 ay find aw keda yegi m3aya yethasab on fly ya3ni virtual column calcluated at time
  // هذا عمود افتراضي بيتحسب تلقائيًا وقت القراءة فقط، ومش بيتخزن في قاعدة البيانات
  user_name: {
    type: DataTypes.VIRTUAL,
    get() // الدالة دي بتشتغل لما نطلب القيمة من العمود ده
    {
      return `${this.first_name} ${this.last_name}`;  // بيرجع الاسم الكامل
    }
  },

  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true,  // يتحقق إن القيمة اللي داخلة بصيغة إيميل صحيحة
    }
  },

  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    set(value) {
      // set function bteshta8al abl el insert/update
      // الدالة دي بتشتغل لما نحط قيمة للـ password، يعني ممكن نضيف تعديل أو تشفير هنا
      const random = Math.random().toString(36).substring(2);  // يعمل random string
      this.setDataValue('password', `${random}_${value}`);
      // setDataValue: بنستخدمها عشان نحط القيمة فعليًا في الـ dataValues اللي هتتخزن في DB
    }
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 18,      // السن الأدنى
      max: 100,     // السن الأقصى
      isInt: true   // لازم يكون عدد صحيح
    }
  },

  gender: {
    type: DataTypes.ENUM('male', 'female'),  // نوع البيانات يكون ذكر أو أنثى فقط
    allowNull: false,
    validate: {
      isIn: [['male', 'female']]  // التحقق من أن القيمة واحدة من الاثنين دول فقط
    }
  }

}, // ----- نهاية تعريف الأعمدة -----

{  // ----- الإعدادات العامة للموديل (Options) -----
  timestamps: true,  // ده بيضيف عمودين تلقائيًا: createdAt و updatedAt

  indexes: [
    // lazem tdefine el name 3shan moshkela el esm el redundant  we tdefine unique wla eh 
    {
      name: 'idx_email_unique',      // اسم الفهرس (index)
      unique: true,                  // فريد، يعني ماينفعش يكون فيه إيميل مكرر
      fields: ['email']              // مخصص لعمود الإيميل
    },

    {
      name: 'idx_first_name_last_name_unique',
      unique: true,
      fields: ['first_name', 'last_name']
      // يعني ممنوع يكون فيه اتنين بنفس الاسم الأول والأخير معًا (combination unique)
    }
  ]
}  // ----- نهاية الإعدادات -----
);

// d2a ely hateshta8al 3lih fel model kolo law 3awez tezawed row tselect ay haga...
// هنا بنصدر الموديل عشان نستخدمه في أي مكان تاني في المشروع
export default User;


