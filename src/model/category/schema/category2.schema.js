import { Schema } from "mongoose";

const categorySchema2 = new Schema({
  id: {
    type: String,
    required: [true, "required: 'id' category: mongoose schema"],
  },
  name: {
    type: String,
    required: [true, "required: 'name' category: mongoose schema"],
  },
  childs: {
    type: Number,
    // required: [true, "required: 'childs' category: mongoose schema"],
  },
  parentId: {
    type: String,
    // required: [true, "required: 'parentId' category: mongoose schema"],
  },
  parentNodeId: {
    type: String,
    // required: [true, "required: 'parentNodeId' category: mongoose schema"],
  },
  level: {
    type: String,
    enum: ["primary", "secondary", "tertiary"],
    required: [true, "required: 'level' category: mongoose schema"],
  },
});

// Hook `pre` para validar el `parentId` y `parentNodeId` según el `level`
categorySchema2.pre("validate", function (next) {
  // Validación de 'parentId' y 'parentNodeId' en función del nivel
  if (this.level === "primary" && this.parentId !== null) {
    this.invalidate(
      "parentId",
      "parentId debe ser nulo para la categoría principal"
    );
    this.invalidate(
      "parentNodeId",
      "parentNodeId debe ser nulo para la categoría principal"
    );
  } else if (this.level !== "primary" && this.parentId === null) {
    this.invalidate(
      "parentId",
      "parentId no puede ser nulo para categorías secundarias o terciarias"
    );
    this.invalidate(
      "parentNodeId",
      "parentNodeId no puede ser nulo para categorías secundarias o terciarias"
    );
  }

  // Validación de 'childs' en función del nivel
  if (this.level === "tertiary" && this.childs !== null) {
    this.invalidate(
      "childs",
      "childs debe ser nulo para la categoría terciaria"
    );
  } else if (this.level !== "tertiary" && this.childs === null) {
    this.invalidate(
      "childs",
      "childs no puede ser nulo para categorías primarias o secundarias"
    );
  }

  next();
});

export default categorySchema2;
