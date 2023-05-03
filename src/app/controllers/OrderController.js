const OrderModel = require("../models/Order");
const NotificationModel = require("../models/notification");
const { multipleToObject } = require("../../utils");

class OrderController {
  async updateStatusOrder(req, res, next) {
    const orderId = await req.params.orderId;
    // console.log(orderId);
    OrderModel.findByIdAndUpdate({ _id: orderId }, { status: "confirmed" })
      .then(async (element) => {
        //save data in table notification when update status in table order => confirmed
        const data = new NotificationModel({
          userId: element.userId,
          content: `${element._id} order confirmed`,
        });
        try {
          await data.save();
          console.log("save done !");
        } catch (error) {
          console.log("save table notification error");
        }
        return res.status(200).json({ msg: "update successfully" });
      })
      .catch((error) => res.status(500).json({ msg: "update fail !" + error }));
  }

  async index(req, res) {
    OrderModel.find()
      .then((element) =>
        res.render("list_order", { element: multipleToObject(element) })
      )
      .catch((error) => res.json(error));
  }
}

module.exports = new OrderController();
