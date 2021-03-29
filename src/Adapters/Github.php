<?php


namespace FoF\Upload\Adapters;

use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Upload\Contracts\UploadAdapter;
use FoF\Upload\File;
use Illuminate\Container\Container;

class Github extends Flysystem implements UploadAdapter
{
    protected function generateUrl(File $file)
    {
        /** @var SettingsRepositoryInterface $settings */
        $settings = Container::getInstance()->make(SettingsRepositoryInterface::class);
        $path = $file->getAttribute('path');
        if (!$path)
            throw new ValidationException(['upload' => 'Github upload failed.']);

        // cdn like jsdelivr
        $cdnUrl = $settings->get('fof-upload.githubCdn');
        if (!$cdnUrl) {
            $branch = $settings->get('fof-upload.githubBranch', 'main');
            $bucket = $settings->get('fof-upload.githubBucket');
            $cdnUrl = 'https://github.com/' . $bucket . '/raw/' . $branch;
        }

        $file->url = sprintf('%s/%s', $cdnUrl, $path);
        /** @todo save to local */
    }
}
