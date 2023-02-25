import { Skeleton } from '@mui/material'
import { Stack } from '@mui/system'
import { Col, Row } from 'reactstrap'

export const IdeaSkeletonComponent = ({ loader = true }: { loader: boolean }) => {
  return (
    <>
      {loader &&
        <div className="w-100 row row-cols-1 row-cols-md-4 g-4 ">

          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
          <SkeletonSingle />
        </div>}
    </>
  )
}


const SkeletonSingle = () => {
  return (
    <Col className="pr-2" >
      <Stack>
        <Row className="mb-2">
          <Col className="d-flex">
            <Skeleton animation="wave" variant="circular" height={40} width={40} />
            <Col className="ms-2">
              <div className="mb-1 w-75">
                <Skeleton animation="wave" variant="rounded" height={15} width={'100%'} />
              </div>
              <div className="w-25">
                <Skeleton animation="wave" variant="rounded" height={12} width={'100%'} />
              </div>
            </Col>
          </Col>
        </Row>

        <Col >
          <Skeleton animation="wave" variant="rounded" height={222} />
        </Col>

        <Col >
          <div className="my-1 w-100">
            <Skeleton animation="wave" variant="rounded" height={12} width={'100%'} />
          </div>
          <div className="my-1 w-75">
            <Skeleton animation="wave" variant="rounded" height={12} width={'100%'} />
          </div>
          <div className="my-1 w-25">
            <Skeleton animation="wave" variant="rounded" height={12} width={'100%'} />
          </div>

        </Col>
      </Stack>q
    </Col>
  )
}