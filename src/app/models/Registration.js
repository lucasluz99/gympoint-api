import { Model, DataTypes } from 'sequelize';
import { isBefore } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: DataTypes.INTEGER,
        plan_id: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        active: {
          type: DataTypes.VIRTUAL,
          get() {
            return isBefore(new Date(), this.end_date);
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
