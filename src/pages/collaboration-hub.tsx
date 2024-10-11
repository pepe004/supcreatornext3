import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const CollaborationHub = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({ title: '', description: '', skills: '' })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await databases.listDocuments('collaboration_projects')
      setProjects(response.documents)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const createProject = async (e) => {
    e.preventDefault()
    try {
      const user = await account.get()
      await databases.createDocument('collaboration_projects', 'unique()', {
        ...newProject,
        creatorId: user.$id,
        createdAt: new Date().toISOString(),
      })
      setNewProject({ title: '', description: '', skills: '' })
      fetchProjects()
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Collaboration Hub</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Collaboration Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createProject} className="space-y-4">
            <Input
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <Textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
            />
            <Input
              placeholder="Required Skills (comma-separated)"
              value={newProject.skills}
              onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
              required
            />
            <Button type="submit">Create Project</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Open Collaboration Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.$id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{project.description}</p>
              <p className="text-sm text-gray-600">Skills: {project.skills}</p>
              <Button className="mt-4">Express Interest</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CollaborationHub