import Project from "./models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const project = await Project.create({
            title,
            content,
            image: req.file.path.replace(/\\/g, '/'),
        });

        res.status(201).json(project);
    } catch (error) {
        console.error("CREATE PROJECT ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1});
        res.status(200).json(projects);
    } catch (error) {
        console.error("GET PROJECTS ERROR:", error);
        res.status(500).json({ error: "Server error while fetching projects" });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({ error: "Project not found"});
        }
        res.json(project);
    } catch (error) {
        console.error("GET PROJECT BY ID ERROR:", error);
        return res.status(500).json({ error: "OOPS! Server error while fetching project"});
    }
}

export const updateProject = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updateProject = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                ...(req.file && { image: req.file.path.replace(/\\/g, '/')}),
            },
            { new: true }
        );

        if (!updateProject) return res.status(404).json({ message: "Project not found"});
        res.status(200).json(updateProject);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            console.error("Project not found");
            res.status(404).json({ message: "Specified project not found"});
        }
        console.log("Project deleted succcessfully")
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error"})
    }
}