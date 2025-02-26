import { VideoDto, VideoUploadDto } from '@/dtos/video.dto';
import {
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import Dropzone from '@/components/common/dropzone/Dropzone';
import { videoUploadValidation } from '@/validators/video.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { useIsMutating } from '@tanstack/react-query';
import { useState } from 'react';

interface VideoUploadFormProps {
  onSubmit: (data: VideoUploadDto) => void;
  defaultValues?: VideoDto;
}

function MetaDataSection() {
  const {
    getValues,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<VideoUploadDto>();

  const [tagInput, setTagInput] = useState('');
  const tags = watch('tags') || [];

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      setValue('tags', [...tags, newTag]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToDelete)
    );
  };

  return (
    <Paper className="w-full p-4 space-y-4">
      <Typography variant="h6">Meta Data</Typography>
      <Typography variant="body1" fontWeight={600}>
        Thumbnail
      </Typography>
      <Dropzone
        variant="image"
        defaultValue={getValues('thumbnail')}
        onChange={(file) => file && setValue('thumbnail', file)}
        error={!!errors.thumbnail}
      />
      <TextField
        {...register('title')}
        label="Title"
        variant="outlined"
        fullWidth
        error={!!errors.title}
        helperText={errors?.title?.message}
      />
      <TextField
        {...register('genre')}
        label="Genre"
        variant="outlined"
        fullWidth
        error={!!errors.genre}
        helperText={
          errors?.genre?.message || 'Separate multiple genres with a comma'
        }
      />
      <TextField
        {...register('duration')}
        label="Duration (Min:Sec)"
        variant="outlined"
        fullWidth
        error={!!errors.duration}
        helperText={errors?.duration?.message}
      />

      <div>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          Tags (Optional)
        </Typography>
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <TextField
            label="Add Tag"
            variant="outlined"
            size="small"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(tagInput);
              }
            }}
            placeholder="Type and press Enter to add tags"
          />
        </div>
      </div>
    </Paper>
  );
}

function DetailsSection() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<VideoUploadDto>();
  return (
    <Paper className="w-full p-4 space-y-4">
      <Typography variant="h6">Details</Typography>
      <TextField
        {...register('short_desc')}
        label="Short Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        error={!!errors.short_desc}
        helperText={errors?.short_desc?.message}
      />
      <TextField
        {...register('about')}
        label="About"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        error={!!errors.about}
        helperText={errors?.about?.message}
      />
      <TextField
        {...register('primary_lesson')}
        label="Primary Lesson"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        error={!!errors.primary_lesson}
        helperText={errors?.primary_lesson?.message}
      />
      <TextField
        {...register('theme')}
        label="Theme"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        error={!!errors.theme}
        helperText={errors?.theme?.message}
      />
      <TextField
        {...register('impact')}
        label="Story Impact"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        error={!!errors.impact}
        helperText={errors?.impact?.message}
      />
      <FormControlLabel
        control={
          <Checkbox
            {...register('slideshow')}
            defaultChecked={getValues('slideshow')}
          />
        }
        label="Show in slideshow"
      />
    </Paper>
  );
}

export default function VideoUploadForm({
  onSubmit,
  defaultValues,
}: VideoUploadFormProps) {
  const isMutating = useIsMutating();

  const formFields = useForm<VideoUploadDto>({
    resolver: zodResolver(videoUploadValidation),
    defaultValues: {
      video_url: '',
      trailer_url: '',
      preroll_url: '',
      thumbnail: defaultValues?.thumbnail_url,
      title: '',
      genre: '',
      duration: '',
      short_desc: '',
      about: '',
      primary_lesson: '',
      theme: '',
      impact: '',
      tags: defaultValues?.tags || [],
      slideshow: false,
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formFields;

  return (
    <FormProvider {...formFields}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Paper className="w-full p-4 space-y-4">
          <Typography variant="h6">URLs</Typography>
          <div className="flex gap-4">
            <TextField
              {...register('video_url')}
              label="Video URL"
              variant="outlined"
              fullWidth
              error={!!errors.video_url}
              helperText={errors?.video_url?.message}
            />

            <TextField
              {...register('trailer_url')}
              label="Trailer URL"
              variant="outlined"
              fullWidth
              error={!!errors.trailer_url}
              helperText={errors?.trailer_url?.message}
            />
            <TextField
              {...register('preroll_url')}
              label="Pre-roll URL"
              variant="outlined"
              fullWidth
              error={!!errors.preroll_url}
              helperText={errors?.preroll_url?.message}
            />
          </div>
        </Paper>
        <div className="flex gap-4 lg:flex-row flex-col">
          <MetaDataSection />
          <DetailsSection />
        </div>
        <LoadingButton
          loading={isMutating > 0}
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Submit
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
