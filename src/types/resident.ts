export interface Resident {
  _id: string
  firstName: string
  lastName: string
  title: string
  profileImage?: string
  linkedIn?: string
  twitter?: string
  createdAt: string
  updatedAt: string
}

export interface ResidentsResponse {
  success: boolean
  message: string
  data: {
    residents: Resident[]
    pagination: {
      currentPage: number
      totalPages: number
      totalResidents: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

export interface CreateResidentResponse {
  success: boolean
  message: string
  data: {
    resident: Resident
  }
}
