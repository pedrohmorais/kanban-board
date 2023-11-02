import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'

class CardModel extends Model {
  public id!: number
  public title!: string
  public content!: string
  public status!: string
}

CardModel.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('New', 'ToDo', 'Doing', 'Done'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Card',
    tableName: 'card',
    timestamps: false,
  },
)

export default CardModel
