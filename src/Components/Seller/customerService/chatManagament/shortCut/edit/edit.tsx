import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hook'
import { fetchMessageShortCutByID, SelectMessageShortCutByID } from '../../../../../../redux/features/messageShortCut'
import CreateMessageShortCut from '../create'

const EditMessageShortCut: React.FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const messageShorCut = useAppSelector(SelectMessageShortCutByID)
    useEffect(() => {
        if (id)
            dispatch(fetchMessageShortCutByID(id))
    }, [dispatch, id])
    return (
        <>
           {messageShorCut &&  <CreateMessageShortCut messageShorCut={messageShorCut} />}
        </>
    )
}

export default EditMessageShortCut