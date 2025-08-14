class ClassController {
    constructor(ClassModel) {
        this.ClassModel = ClassModel;
    }

    async createClass(req, res) {
        try {
            const newClass = await this.ClassModel.create(req.body);
            res.status(201).json(newClass);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getClasses(req, res) {
        try {
            const classes = await this.ClassModel.findAll();
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateClass(req, res) {
        try {
            const updatedClass = await this.ClassModel.update(req.params.id, req.body);
            if (!updatedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json(updatedClass);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteClass(req, res) {
        try {
            const deletedClass = await this.ClassModel.delete(req.params.id);
            if (!deletedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ClassController;